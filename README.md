# Nuanced News
Nuanced News is a web application that aggregates current news stories from around the web. It outlines left-leaning and right-leaning bias and allows readers to get the WHOLE story.

## Features
- User Authentication
- News Aggregation
- Real-time updates
- Article search using free News API
  
## How it Works
Large news publications post their .rss files, which are XML files that contain the latest news articles from the publication. The Nuanced News app fetches these .rss files from various sources, parses the XML to extract article information, and categorizes the articles based on their source's political bias.

## Technologies Used
- ### Frontend:
* React
* Bootstrap
* Vite
* Axios
- ### Backend:
* Flask
* Python
- ### Other:
* Firebase (User Auth)

## Installation and Setup
### 1. Clone the repository
```bash
git clone https://github.com/jackabald/NuancedNews.git
cd NuancedNews
```
### 2. Backend Setup
- Navigate to the backend directory and setup a virtual environment:
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```
- Install the required Python packages:
```bash
pip install -r requirements.txt
```
- Start the Flash server:
```bash
python app.py
```
### 3. Frontend Setup
- Navigate to the frontend directory:
```bash
cd Frontend
```
- Install required node packages:
```bash
npm install
```
- Create a .env file in the frontend directory to hold all of your environment variables for Firebase Web SDK (message me for help):
```
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
```
- Start development server:
```bash
npm run dev
```
