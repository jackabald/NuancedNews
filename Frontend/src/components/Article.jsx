import React, { useEffect } from "react";
import "./Article.css";
import $ from "jquery";

const Article = ({ title, description, link }) => {
  useEffect(() => {
    $(function() {
      $('.pp-bookmark-btn').on('click', function() {
        var btn = $(this);

        if (btn.hasClass("active")) {
          btn.removeClass("active");
        } else {
          btn.addClass("active");
        }
      });
    });
  }, []);

  return (
    <div className="article-container">
      <div className="article">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">Read more</a>
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
