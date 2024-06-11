import axios from "axios";

const API_URL = "http://localhost:5000/api/news"; 

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
