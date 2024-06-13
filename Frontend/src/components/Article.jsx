import React from "react";
import "./Article.css"


const Article = ({ title, description, url}) => {
  return (
    <div className="article-container">
        <div className="article">
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    </div>
  );
};

export default Article;