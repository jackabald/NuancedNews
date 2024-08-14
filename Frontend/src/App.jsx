import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { fetchNews } from "./services/newsService";
import Navbar from "./components/Navbar";
import NewsCards from "./components/NewsCards";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import More from "./components/More";
import About from "./components/About";

function App() {
  const [news, setNews] = useState([]);

  // Fetch news data
  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsCards news={news} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route path="/more" element={<More news={news} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
