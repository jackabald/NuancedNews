import React, { useState } from "react";
import "./Article.css";
import samplecard from "../assets/img/samplecard.png";
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

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  // const truncateDescription = (description, maxLength = 100) => {
  //   if (description == null) {
  //     return '';
  //   }
  //   if (isTruncated && description.length > maxLength) {
  //     return (
  //       <span>
  //         {`${description.substring(0, maxLength)}...`}
  //         <span onClick={toggleTruncate} style={{ color: 'blue', cursor: 'pointer' }}> Show More</span>
  //       </span>
  //     );
  //   }
  //   return (
  //     <span>
  //       {description}
  //       {description.length > maxLength && (
  //         <span onClick={toggleTruncate} style={{ color: 'blue', cursor: 'pointer' }}> Show less</span>
  //       )}
  //     </span>
  //   );
  // };


  const getLogoUrl = (source) => {
    switch (source) {
      case "CNN":
        return "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg";
      case "NYT":
        return "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg";
      case "WSJ":
        return "https://s.wsj.net/img/meta/wsj-social-share.png";
      case "FOX":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/1200px-Fox_News_Channel_logo.svg.png";
      default:
        return 0;
    }
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
              <img src={thumbnail} />
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
