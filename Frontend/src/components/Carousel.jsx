import React, { useState, useMemo } from "react";
import Article from "./Article";
import "./Carousel.css";
import { groupNewsBySource } from "./utils";
import LazyLoad from "react-lazyload";

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoize groupedNews to avoid recalculating unless news changes
  const groupedNews = useMemo(() => groupNewsBySource(news), [news]);

  // Function to render articles for each source to avoid repetition
  const renderArticles = (sourceKey) => (
    <div className="slides-wrapper">
      {groupedNews[sourceKey] &&
        groupedNews[sourceKey].map((article, index) => (
          <LazyLoad height={200} key={index}>
            <div className="">
              <Article {...article} />
            </div>
          </LazyLoad>
        ))}
    </div>
  );

  const slides = [
    {
      label: "The Grayzone",
      content: renderArticles("TGZ"),
    },
    {
      label: "The Daily Wire",
      content: renderArticles("Dwire"),
    },
    {
      label: "The Washington Examiner",
      content: renderArticles("Wexam"),
    },
    {
      label: "NPR",
      content: renderArticles("NPR"),
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators mb-0">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            data-bs-interval={index === 0 ? "10000" : "2000"}
          >
            <div className="h5-lable">
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
                onClick={handlePrev}
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button><span>{slide.label}</span>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
                onClick={handleNext}
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="carousel-slide-content">{slide.content}</div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Carousel;
