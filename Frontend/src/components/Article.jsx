import React, { useState } from "react";
import "./Article.css";

const Article = ({ title, description, link, source }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true); // State for truncation

  const handleClick = () => {
    setIsBookmark(!isBookmark);
  };

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description == null) {
      return '';
    }
    if (isTruncated && description.length > maxLength) {
      return (
        <span>
          {`${description.substring(0, maxLength)}...`}
          <span onClick={toggleTruncate} style={{color: 'blue', cursor: 'pointer'}}> Show More</span>
        </span>
      );
    }
    return (
      <span>
        {description}
        {description.length > maxLength && (
          <span onClick={toggleTruncate} style={{color: 'blue', cursor: 'pointer'}}> Show less</span>
        )}
      </span>
    );
  };


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
        return "https://via.placeholder.com/100"; 
    }
  };

  return (
    <div className="article-container">
      <div className="article">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="article-content">
            <div className="article-text">
              <h3>{title}</h3>
              <p className="onhover">{truncateDescription(description)}</p>
            </div>
            <img src={getLogoUrl(source)} alt={source} className="article-logo" />
          </div>
        </a>
        <div className="article-footer">
          <button
            type="button"
            className={`bookmark-btn ${isBookmark ? "red" : ""}`}
            onClick={handleClick}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Article;
