import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Dropdown from "./components/Dropdown.jsx";
import { fetchNews } from "./services/newsService";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [cnnArticles, setCnnArticles] = useState([]);
  const [bbcArticles, setBbcArticles] = useState([]);
  const [foxArticles, setFoxArticles] = useState([]);
  const [wsjArticles, setWsjArticles] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setCnnArticles(
          data.filter(
            (article) => article.source === "CNN.com - RSS Channel - World"
          )
        );
        setBbcArticles(data.filter((article) => article.source === "BBC News"));
        setFoxArticles(
          data.filter(
            (article) => article.source === "Latest & Breaking News on Fox News"
          )
        );
        setWsjArticles(
          data.filter((article) => article.source === "WSJ.com: World News")
        );
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  }, []);

  const handleSearch = (articles) => {
    setSearchResults(articles);
  };

  return (
    <Router>
      <div className="app">
        <div className="container">
          <header className="app-header">
            <h1>News Explorer</h1>
            <p>Get well-rounded news articles from various sources</p>
            <nav>
              <Link to="/">Home</Link> | <Link to="/signin">Sign In</Link> |{" "}
              <Link to="/signup">Sign Up</Link>
            </nav>
          </header>
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchBar onSearch={handleSearch} />
                    <div className="dropdown-container">
                      <Dropdown
                        label="CNN (Left Leaning)"
                        articles={cnnArticles}
                      />
                      <Dropdown
                        label="BBC (Left Leaning)"
                        articles={bbcArticles}
                      />
                      <Dropdown
                        label="WSJ (Right Leaning)"
                        articles={wsjArticles}
                      />
                      <Dropdown
                        label="Fox (Right Leaning)"
                        articles={foxArticles}
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        <h2>Search Results</h2>
                        <ul>
                          {searchResults.map((article, index) => (
                            <li key={index}>
                              <h3>{article.title}</h3>
                              <p>{article.description}</p>
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Read more
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
