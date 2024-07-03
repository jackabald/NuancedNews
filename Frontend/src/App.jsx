import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { fetchNews } from "./services/newsService";
import Navbar from "./components/Navbar";
import Accordion from "./components/Accordion";
import Profile from "./components/Profile";
import More from "./components/More";
import About from "./components/About";

function App() {
  const [news, setNews] = useState([]);

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
            <Route path="/" element={<Accordion news={news} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/more" element={<More />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
