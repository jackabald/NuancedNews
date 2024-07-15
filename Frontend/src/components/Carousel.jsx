import React, { useState } from "react";
import Article from "./Article";
import "./Carousel.css";
import { groupNewsBySource } from "./utils";

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupedNews = groupNewsBySource(news);

  const slides = [
      {
        label: "The Grayzone",
        content: (
          <div className="row justify-content-center custom-scrollable-div border">
            {groupedNews["TGZ"] && (
            groupedNews["TGZ"].map((article, index) => (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                <Article {...article} />
              </div>
      ))
    )}
  </div>
        ),
      },
      {
        label: "The Daily Wire",
        content: (
          <div className="row justify-content-center custom-scrollable-div border">
            {groupedNews["Dwire"] && (
            groupedNews["Dwire"].map((article, index) => (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                <Article {...article} />
              </div>
      ))
    )}
  </div>
        ),
      },
      {
        label: "The Washington Examiner",
        content: (
          <div className="row justify-content-center custom-scrollable-div border">
            {groupedNews["Wexam"] && (
            groupedNews["Wexam"].map((article, index) => (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                <Article {...article} />
              </div>
      ))
    )}
  </div>
        ),
      }, 
      {
        label: "NPR",
        content: (<div className="row justify-content-center custom-scrollable-div border">
          {groupedNews["NPR"] && (
          groupedNews["NPR"].map((article, index) => (
            <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
              <Article {...article} />
            </div>
    ))
  )}
</div>),
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
      <div className="carousel-indicators">
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
            <h5>{slide.label}</h5>
            <div>{slide.content}</div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
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
  );
};

export default Carousel;
