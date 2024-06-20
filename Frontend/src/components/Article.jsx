import React, { useEffect } from "react";
import "./Article.css";
import $ from "jquery";

const Article = ({ title, description, link }) => {
  useEffect(() => {
    const handleClick = (event) => {
      const btn = $(event.target);
      btn.toggleClass("active");
    };

    $(".pp-bookmark-btn").on("click", handleClick);

    return () => {
      $(".pp-bookmark-btn").off("click", handleClick);
    };
  }, []);

  return (
    <div className="article-container">
      <div className="article">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        <button
          type="button"
          className="pp-bookmark-btn btn btn-default btn-lg pull-right"
          data-context="investor"
          data-context-action="view"
          data-context-id="7"
        ></button>
      </div>
    </div>
  );
};

export default Article;
