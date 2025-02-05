import requests
import json
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from fetch_image_link import fetch_image_link

def getRSS(url: str) -> ET.Element:
    try:
        response = requests.get(url)
        response.raise_for_status()
        return ET.fromstring(response.content)
    except (requests.RequestException, ET.ParseError) as e:
        print(f"Error retrieving or parsing XML from {url}: {e}")
        return None

def parseGuardianDescription(description: str) -> str:
    soup = BeautifulSoup(description, "html.parser")
    cleaned_description = soup.get_text(" ", strip=True)
    return cleaned_description

def extract_images_from_content(content: str) -> list:
    soup = BeautifulSoup(content, "html.parser")
    # Extract all image sources from img tags
    images = [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]
    return images

def process_feed(feed_url: str, is_html: bool = False) -> list:
    feed = getRSS(feed_url)
    if feed is None:
        print(f"Failed to retrieve feed from {feed_url}")
        return []
    
    items = []
    source = feed.findtext(".//channel/title", default="Unknown Source")
    
    for item in feed.findall(".//item"):
        title = item.findtext("title", default="No Title")
        link = item.findtext("link", default="")
        description = item.findtext("description", default="")
        content_encoded = item.find("{http://purl.org/rss/1.0/modules/content/}encoded")
        enclosure = item.find("enclosure")
    
        # Only process valid links
        if link:
            # Extract images from content:encoded if available
            img_links = extract_images_from_content(content_encoded.text) if content_encoded is not None and content_encoded.text else []
            img_link = img_links[0] if img_links else (enclosure.get('url') if enclosure is not None else fetch_image_link(link))
            
            if is_html:
                description = parseGuardianDescription(description)
                
            items.append({
                "title": title,
                "link": link,
                "description": description,
                "source": source, 
                "thumbnail": img_link
            })
    
    return items


def main():
    feeds = [
        {"url": "https://feeds.a.dj.com/rss/RSSWorldNews.xml", "is_html": False},
        {"url": "https://feeds.a.dj.com/rss/RSSOpinion.xml", "is_html": False},
        {"url": "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", "is_html": False},
        {"url": "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", "is_html": False},
        {"url": "http://rss.cnn.com/rss/edition_world.rss", "is_html": False},
        {"url": "http://rss.cnn.com/rss/cnn_allpolitics.rss", "is_html": False},
        {"url": "http://rss.cnn.com/rss/cnn_latest.rss", "is_html": False},
        {"url": "https://moxie.foxnews.com/google-publisher/world.xml", "is_html": False},
        {"url": "https://moxie.foxnews.com/google-publisher/politics.xml", "is_html": False},
        {"url": "https://nypost.com/world-news/feed/", "is_html": False},
        {"url": "https://nypost.com/politics/feed/", "is_html": False},
        {"url": "https://www.theguardian.com/world/rss", "is_html": True},
        {"url": "https://www.theguardian.com/politics/rss", "is_html": True},
        {"url": "https://www.washingtonpost.com/arcio/rss/category/politics/?itid=lk_inline_manual_2", "is_html": False},
        {"url": "https://feeds.washingtonpost.com/rss/world?itid=lk_inline_manual_35", "is_html": False},
        {"url": "https://feeds.npr.org/1001/rss.xml", "is_html": False},
        {"url": "https://rss.app/feeds/adYxbhoFRWTTGEtI.xml", "is_html": False},
        {"url": "https://feeds.bbci.co.uk/news/world/rss.xml", "is_html": False},
        {"url": "https://www.dailywire.com/feeds/rss.xml", "is_html": False},
        {"url": "https://www.newyorker.com/feed/news", "is_html": False},
        {"url": "https://thegrayzone.com/feed/", "is_html": True},
        {"url": "https://www.washingtonexaminer.com/section/news/feed", "is_html": False},
    ]
    
    all_articles = []
    
    for feed in feeds:
        articles = process_feed(feed["url"], feed["is_html"])
        if not articles:
            print(f"Skipping feed {feed['url']} due to errors.")
        all_articles.extend(articles)
        # print(all_articles)
    
    with open("rss_feed.json", "w") as file:
        json.dump(all_articles, file, indent=4)

if __name__ == "__main__":
    main()
