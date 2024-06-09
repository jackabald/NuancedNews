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

  const handleSearch = (articles) => {
    setSearchResults(articles);
  };

  return (
    <Router>
      <div className="app">
        <div className="container">
          <header className="app-header">
            <h1>Nuanced News</h1>
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
                      <Dropdown label="CNN" articles={cnn} />
                      <Dropdown label="BBC" articles={bbc} />
                      <Dropdown label="WSJ" articles={wsj} />
                      <Dropdown label="Fox" articles={fox} />
                      <Dropdown label="The Daily Wire" articles={dw} />
                      <Dropdown label="The New Yorker" articles={ny} />
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
