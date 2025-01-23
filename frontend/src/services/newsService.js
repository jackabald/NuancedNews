import axios from "axios";

const API_URL = "http://localhost:5000/api/news"; 
const SUMMARY_API_URL = "http://localhost:5000/summarize"; // Endpoint for summarization

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};



export const getSummary = async (articleUrl) => {
  try {
    const response = await axios.post(SUMMARY_API_URL, {
      url: articleUrl, 
    });

    if (response.status === 200) {
      return response.data.summary; 
    } else {
      throw new Error("Failed to fetch summary");
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error; 
  }
};