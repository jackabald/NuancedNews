import json
import aiohttp
import asyncio
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import logging
from concurrent.futures import ThreadPoolExecutor
from functools import partial

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to fetch RSS feed content
async def fetch_rss(session: aiohttp.ClientSession, url: str) -> Optional[str]:
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        async with session.get(url, headers=headers, timeout=30) as response:
            response.raise_for_status()
            return await response.text()
    except Exception as e:
        logger.error(f"Error fetching {url}: {e}")
        return None

# Function to parse XML content
def parse_xml(content: str) -> Optional[ET.Element]:
    try:
        return ET.fromstring(content)
    except ET.ParseError as e:
        logger.error(f"Error parsing XML: {e}")
        return None

# Function to extract images from HTML content
def extract_images(content: str) -> List[str]:
    soup = BeautifulSoup(content, "lxml")
    return [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]

# Function to extract media image from various sources
def extract_media_image(item: ET.Element) -> Optional[str]:
    namespaces = {'media': 'http://search.yahoo.com/mrss/'}

    # 1. Check <media:group> for <media:content>
    media_group = item.find(".//media:group", namespaces=namespaces)
    if media_group is not None:
        media_content = media_group.find(".//media:content", namespaces=namespaces)
        if media_content is not None and 'url' in media_content.attrib:
            return media_content.attrib['url']

    # 2. Check for <media:content> directly
    media_content = item.find(".//media:content", namespaces=namespaces)
    if media_content is not None and 'url' in media_content.attrib:
        return media_content.attrib['url']

    # 3. Check for <media:thumbnail>
    media_thumbnail = item.find(".//media:thumbnail", namespaces=namespaces)
    if media_thumbnail is not None and 'url' in media_thumbnail.attrib:
        return media_thumbnail.attrib['url']

    return None

async def fetch_image_link(session: aiohttp.ClientSession, url: str) -> Optional[str]:
    def switch_class_based_on_url(url):
        class_mapping = {
            'https://thegrayzone.com': 'hero'
        }
        for key in class_mapping:
            if url.startswith(key):
                return class_mapping[key]
        return 'DefaultClass'

    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        async with session.get(url, headers=headers, timeout=30) as response:
            if response.status != 200:
                return None
            html = await response.text()

        soup = BeautifulSoup(html, 'html.parser')
        class_name = switch_class_based_on_url(url)
        hero_section = soup.find(class_=class_name)

        if hero_section:
            img_tag = hero_section.find('img')
            if img_tag and 'src' in img_tag.attrs:
                return img_tag['src']

        return None
    except Exception as e:
        logger.error(f"Error scraping image from {url}: {e}")
        return None

def remove_html_tags(text: str) -> str:
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text()

# Process each RSS item
async def process_item(item: ET.Element, source: str, is_html: bool, logo_url: str, session: aiohttp.ClientSession) -> Optional[Dict]:
    try:
        title = item.findtext("title", default="No Title")
        link = item.findtext("link", default="")
        description = item.findtext("description", default="")
        content_encoded = item.find("{http://purl.org/rss/1.0/modules/content/}encoded")
        logo = logo_url
        if not link:
            return None

        clean_description = remove_html_tags(description)

        img_links = []
        media_image_url = extract_media_image(item)
        if media_image_url:
            img_links.append(media_image_url)

        enclosure = item.find("enclosure")
        if enclosure is not None and 'url' in enclosure.attrib:
            img_links.append(enclosure.attrib['url'])

        if not img_links and content_encoded is not None and content_encoded.text:
            img_links.extend(extract_images(content_encoded.text))

        if not img_links:
            scraped_image = await fetch_image_link(session, link)
            if scraped_image:
                img_links.append(scraped_image)

        thumbnail = img_links[0] if img_links else logo_url

        return {
            "title": title,
            "link": link,
            "description": clean_description,
            "source": source,
            "thumbnail": thumbnail,
            "logo": logo
        }
    except Exception as e:
        logger.error(f"Error processing item: {e}")
        return None

# Process each RSS feed
async def process_feed(session: aiohttp.ClientSession, source_name: str, feed_config: Dict) -> List[Dict]:
    url = feed_config["url"]
    is_html = feed_config.get("is_html", False)
    logo_url = feed_config.get("logo", "")

    content = await fetch_rss(session, url)
    if not content:
        return []

    feed = parse_xml(content)
    if feed is None:
        return []

    source = source_name  # Use key from JSON as source

    tasks = [
        process_item(item, source, is_html, logo_url, session)
        for item in feed.findall(".//item")
    ]
    results = await asyncio.gather(*tasks)

    return [item for item in results if item is not None]

# Main function
async def main():
    with open("feeds_name.json", "r") as f:
        feeds = json.load(f)

    timeout = aiohttp.ClientTimeout(total=60)
    connector = aiohttp.TCPConnector(limit=10)
    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
        tasks = [process_feed(session, feed_name, feed) for feed_name, feed in feeds.items()]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        all_articles = []
        for result in results:
            if isinstance(result, Exception):
                logger.error(f"Feed processing error: {result}")
                continue
            all_articles.extend(result)

    with open("rss_feed.json", "w", encoding="utf-8") as file:
        json.dump(all_articles, file, indent=4)

if __name__ == "__main__":
    asyncio.run(main())
