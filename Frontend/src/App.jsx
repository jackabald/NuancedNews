import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { fetchNews } from "./services/newsService";
import Navbar from "./components/Navbar"
import Accordion from "./components/Accordion";
import Profile from "./components/Profile";
import More from "./components/More";
import About from "./components/About";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [cnn, setCnn] = useState([]);
  const [bbc, setBbc] = useState([]);
  const [fox, setFox] = useState([]);
  const [wsj, setWsj] = useState([]);
  const [dw, setDw] = useState([]);
  const [ny, setNy] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setCnn(
          data.filter(
            (article) => article.source === "CNN.com - RSS Channel - World"
          )
        );
        setBbc(data.filter((article) => article.source === "BBC News"));
        setFox(
          data.filter(
            (article) => article.source === "Latest & Breaking News on Fox News"
          )
        );
        setWsj(
          data.filter((article) => article.source === "WSJ.com: World News")
        );
        setDw(
          data.filter(
            (article) =>
              article.source ===
              "The Daily Wire - Breaking News, Videos & Podcasts"
          )
        );
        setNy(
          data.filter(
            (article) =>
              article.source ===
              "News, Politics, Opinion, Commentary, and Analysis"
          )
        );
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  }, []);


    return (
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Accordion />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/more" element={<More />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
