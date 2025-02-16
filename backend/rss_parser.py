import aiohttp
import asyncio
import json
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import logging
from concurrent.futures import ThreadPoolExecutor
from functools import partial

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def fetch_rss(session: aiohttp.ClientSession, url: str) -> Optional[str]:
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        async with session.get(url, headers=headers, timeout=30) as response:
            response.raise_for_status()
            return await response.text()
    except aiohttp.ClientError as e:
        logger.error(f"Error fetching {url}: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error fetching {url}: {e}")
        return None

def parse_xml(content: str) -> Optional[ET.Element]:
    try:
        return ET.fromstring(content)
    except ET.ParseError as e:
        logger.error(f"Error parsing XML: {e}")
        return None

def parse_description(description: str, is_html: bool) -> str:
    if is_html:
        soup = BeautifulSoup(description, "lxml")  # Removed parser argument
        return soup.get_text(" ", strip=True)
    return description

def extract_images(content: str) -> list:
    soup = BeautifulSoup(content, "lxml")  # Removed parser argument
    return [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]

def process_item(item: ET.Element, source: str, is_html: bool) -> Dict:
    try:
        title = item.findtext("title", default="No Title")
        link = item.findtext("link", default="")
        description = item.findtext("description", default="")
        content_encoded = item.find("{http://purl.org/rss/1.0/modules/content/}encoded")
        enclosure = item.find("enclosure")

        if not link:
            return None

        # Extract images
        img_links = (extract_images(content_encoded.text) if content_encoded is not None and content_encoded.text 
                    else [enclosure.get('url')] if enclosure is not None else [])
        
        return {
            "title": title,
            "link": link,
            "description": parse_description(description, is_html),
            "source": source,
            "thumbnail": img_links[0] if img_links else ""
        }
    except Exception as e:
        logger.error(f"Error processing item: {e}")
        return None

async def process_feed(session: aiohttp.ClientSession, feed_config: Dict) -> List[Dict]:
    url, is_html = feed_config["url"], feed_config["is_html"]
    content = await fetch_rss(session, url)
    
    if not content:
        return []

    feed = parse_xml(content)
    if feed is None:
        return []

    source = feed.findtext(".//channel/title", default="Unknown Source")
    
    # Process items in parallel using ThreadPoolExecutor
    with ThreadPoolExecutor() as executor:
        process_func = partial(process_item, source=source, is_html=is_html)
        items = list(executor.map(process_func, feed.findall(".//item")))
    
    return [item for item in items if item is not None]

async def main():
    feeds = [
        {"url": "https://feeds.a.dj.com/rss/RSSWorldNews.xml", "is_html": False},
        {"url": "https://feeds.a.dj.com/rss/RSSOpinion.xml", "is_html": False},
        {"url": "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", "is_html": False},
        {"url": "http://rss.cnn.com/rss/edition_world.rss", "is_html": False},
        {"url": "http://rss.cnn.com/rss/cnn_allpolitics.rss", "is_html": False},
        {"url": "http://rss.cnn.com/rss/cnn_latest.rss", "is_html": False},
        {"url": "https://moxie.foxnews.com/google-publisher/world.xml", "is_html": False},
        {"url": "https://moxie.foxnews.com/google-publisher/politics.xml", "is_html": False},
        {"url": "https://nypost.com/world-news/feed/", "is_html": False},
        {"url": "https://nypost.com/politics/feed/", "is_html": False},
        {"url": "https://www.theguardian.com/world/rss", "is_html": True},
        {"url": "https://www.theguardian.com/politics/rss", "is_html": True},
        {"url": "https://feeds.npr.org/1001/rss.xml", "is_html": False},
        {"url": "https://feeds.bbci.co.uk/news/world/rss.xml", "is_html": False},
        {"url": "https://www.dailywire.com/feeds/rss.xml", "is_html": False},
        {"url": "https://www.newyorker.com/feed/news", "is_html": False},
        {"url": "https://thegrayzone.com/feed/", "is_html": True},
        {"url": "https://www.washingtonexaminer.com/section/news/feed", "is_html": False},
    ]
    
    # Configure client session with longer timeout
    timeout = aiohttp.ClientTimeout(total=60)
    connector = aiohttp.TCPConnector(limit=10)  # Limit concurrent connections
    
    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
        tasks = [process_feed(session, feed) for feed in feeds]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_articles = []
        for result in results:
            if isinstance(result, Exception):
                logger.error(f"Feed processing error: {result}")
                continue
            all_articles.extend(result)
    
    with open("rss_feed.json", "w") as file:
        json.dump(all_articles, file, indent=4)

if __name__ == "__main__":
    asyncio.run(main())
