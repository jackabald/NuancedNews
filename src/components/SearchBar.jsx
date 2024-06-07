import React, { useState } from "react";
import axios from "axios";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    try {
      const sources = [
        "bbc-news",
        "cnn",
        "the-new-york-times",
        "the-washington-post",
        "reuters",
        "associated-press",
        "al-jazeera-english",
        "fox-news",
        "nbc-news",
        "abc-news",
      ];

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          inputValue
        )}&sources=${sources.join(",")}&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const articles = response.data.articles.slice(0, 3); // Limit to 3 results
      console.log("API Response:", articles);
      onSearch(articles);
    } catch (error) {
      console.error("Error fetching news data:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter search keywords..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
