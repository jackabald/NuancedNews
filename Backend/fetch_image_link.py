import requests
from bs4 import BeautifulSoup

def switch_class_based_on_url(url):

    class_mapping = {
        'https://thegrayzone.com': 'hero',
        'https://google': 'GoogleClass',
        'https://github': 'GithubClass',
        'https://facebook': 'FacebookClass',
    }
 
    for key in class_mapping:
        if url.startswith(key):
            return class_mapping[key]
     
    return 'DefaultClass'

def fetch_image_link(url):
  
    class_name = switch_class_based_on_url(url)
   
    response = requests.get(url)
    
    if response.status_code != 200:
        return f"Failed to retrieve the page. Status code: {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')
     
    hero_section = soup.find(class_='hero')
    
    if hero_section:
    
        img_tag = hero_section.find('img')
        
        if img_tag and 'src' in img_tag.attrs:
            return img_tag['src']
        else:
            return "https://placehold.co/600x400.png"
    else:
        return "https://placehold.co/600x400.png"
