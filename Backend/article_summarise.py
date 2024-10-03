import requests
from bs4 import BeautifulSoup
from transformers import pipeline

def scrape_and_summarize(url):
    # Fetch the article content
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses
    except requests.exceptions.RequestException as e:
        return f"Error fetching article: {e}"

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the main content of the article
    paragraphs = soup.find_all('p')
    if not paragraphs:
        return "Error: No paragraphs found in the article."

    article_content = ' '.join([para.get_text() for para in paragraphs]).strip()

    if not article_content:
        return "Error: No content to summarize."

    # Limit the article content to avoid summarization issues
    max_input_length = 1024  # Maximum tokens for most models is around this range
    article_content = article_content[:max_input_length]

    # Initialize the summarization pipeline
    summarizer = pipeline('summarization', model='sshleifer/distilbart-cnn-12-6')

    try:
        # Summarize the article content
        summary = summarizer(article_content, max_length=150, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error during summarization: {e}"