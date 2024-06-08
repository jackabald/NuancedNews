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
      const trustedSources = [
        "bbc-news",
        "cnn",
        "fox-news",
        "the-new-york-times",
        "the-washington-post",
        "reuters",
        "associated-press",
        "al-jazeera-english",
        "nbc-news",
        "abc-news",
      ];

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          inputValue
        )}&sources=${trustedSources.join(",")}&pageSize=100&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );

      const articles = response.data.articles;
      const uniqueArticles = [];
      const sources = new Set();

      for (const article of articles) {
        if (!sources.has(article.source.name)) {
          uniqueArticles.push(article);
          sources.add(article.source.name);
        }
        if (uniqueArticles.length >= 3) break;
      }

      console.log("Filtered Articles:", uniqueArticles);
      onSearch(uniqueArticles);
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
