import xmltodict
import requests
import json
from typing import List, Dict

def get_rss(url: str) -> dict:
    response = requests.get(url)
    return xmltodict.parse(response.content)

def parse_feeds(urls: List[str]) -> List[Dict]:
    all_articles = []
    for url in urls:
        try:
            data = get_rss(url)
            for item in data['rss']['channel']['item']:
                try:
                    article = {
                        "title": item.get('title', 'No title'),
                        "description": item.get('description', 'No description'),
                        "link": item.get('link', 'No link'),
                        "source": data['rss']['channel']['title']
                    }
                    all_articles.append(article)
                except KeyError as e:
                    print(f"Error parsing item in {url}: {e}")
        except Exception as e:
            print(f"Error parsing {url}: {e}")
    return all_articles

def save_to_json(filepath: str, data: List[Dict]) -> None:
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    urls = [
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "http://rss.cnn.com/rss/edition_world.rss",
        "https://feeds.foxnews.com/foxnews/latest",
        "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
        "https://www.dailywire.com/feeds/rss.xml",
        "https://www.newyorker.com/feed/news",
        "https://thegrayzone.com/feed/",
    ]
    articles = parse_feeds(urls)
    save_to_json("rss_feed.json", articles)
