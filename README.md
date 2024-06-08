# Nuanced News
Nuanced News is a web application that aggregates current news stories from around the web. It outlines left-leaning and right-leaning bias and allows readers to get the WHOLE story.

## Features
- User Authentication
- News Aggregation
- Bias Categorization
- Real-time updates
- Article search using free News API
  
## How it Works
Large news publications post their .rss files, which are XML files that contain the latest news articles from the publication. The Nuanced News app fetches these .rss files from various sources, parses the XML to extract article information, and categorizes the articles based on their source's political bias.

## Technologies Used
- ### Frontend:
* React
* Vite
* Axios
- ### Backend:
* Flask
* Python
- ### Others:
* Firebase (User Auth and Firestore)
