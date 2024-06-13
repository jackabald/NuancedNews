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
        
        "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
        "https://feeds.a.dj.com/rss/RSSOpinion.xml",
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
        "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
        "http://rss.cnn.com/rss/edition_world.rss",
        "http://rss.cnn.com/rss/cnn_allpolitics.rss",
        "https://moxie.foxnews.com/google-publisher/world.xml",
        "https://moxie.foxnews.com/google-publisher/politics.xml",
        "https://nypost.com/world-news/feed/",
        "https://nypost.com/politics/feed/",
        "https://www.theguardian.com/world/rss",
        "https://www.theguardian.com/politics/rss",

        # more feeds from other publications
        "https://www.washingtonpost.com/arcio/rss/category/politics/?itid=lk_inline_manual_2",
        "https://feeds.washingtonpost.com/rss/world?itid=lk_inline_manual_35",
        "https://feeds.npr.org/1001/rss.xml",
        "https://rss.app/feeds/adYxbhoFRWTTGEtI.xml",
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://www.dailywire.com/feeds/rss.xml",
        "https://www.newyorker.com/feed/news",
        "https://thegrayzone.com/feed/",
        "https://www.washingtonexaminer.com/section/news/feed",
    ]
    articles = parse_feeds(urls)
    save_to_json("rss_feed.json", articles)
