import { useState } from "react";
import "./Article.css";
import bookmark from "../assets/img/bookmark.svg";
import bookmarked from "../assets/img/bookmarked.svg";
import { getSummary } from "../services/newsService";

const Article = ({ title, description, link, source,thumbnail }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsBookmark(!isBookmark);
  };

   const fetchSummary = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await getSummary(link); 
      console.log("Fetched summary:", response); 

      if (response && response) {
        setSummary(response); 
        console.log("Article component rendered with summary1:", summary);
      } else {
        setSummary("No summary available or an error occurred."); // Handle no summary case
        console.log("Article component rendered with summary111:", summary);
      }
    } catch (error) {
      console.error("Error fetching summary:", error); // Log error to console
      setSummary("Error fetching summary: " + error.message); // Set error message
    } finally {
      setIsLoading(false);
  };
  };
  return (
    <div className="article-container">
      <div className="article">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="article-content">
       
            {/* <img src={getLogoUrl(source)} alt={source}width={100} className="article-logo" /> */}
            <div className="img-container">
              <img src={thumbnail? thumbnail : "/logos/"+source.split(" | ").pop().trim().replace(/\s+/g, "_") + ".png"} />
            </div>
            <div className="article-text">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>

          </div>
        </a>
        <div className="article-footer">
          <div className="showmore"><a href="#" className="showmore">Open Article</a></div>
          <button type="button" onClick={fetchSummary} className="showmore">
            {isLoading ? "Summarizing..." : "Summarize Article"}
          </button>
          <button
            type="button"
            onClick={handleClick}
          ><img src={isBookmark? bookmarked : bookmark} width = {35} height ={35} alt="bookamrk"/></button>
        </div>
        {summary && (
          <div className="summary">
            <h4>Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
