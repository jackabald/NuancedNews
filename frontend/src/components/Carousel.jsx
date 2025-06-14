import { useState, useMemo, useEffect } from "react";
import Article from "./Article";
import "./Carousel.css";
import { groupNewsBySource } from "./utils";

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state

  // Memoize groupedNews to avoid recalculating unless news changes
  const groupedNews = useMemo(() => groupNewsBySource(news), [news]);
console.log(groupedNews)
  // Function to render articles for each source to avoid repetition
  const renderArticles = (sourceKey) => (
    <div className="slides-wrapper">
      {groupedNews[sourceKey]?.articles.map((article, index) => (
        <div key={index}>
          <Article {...article} />
        </div>
      ))}
    </div>
  );

  // Generate slides dynamically based on groupedNews keys
  const slides = Object.keys(groupedNews).map((sourceKey) => ({
    label: sourceKey,  // The label is the source key
    content: renderArticles(sourceKey), // Render articles for the source
  }));

  // Handle previous and next slide navigation
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

  // Use effect to simulate loading of data and set loading state to false after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate news loading
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setLoading(false); // Set loading to false when news is available
    }
  }, [news]);

  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      {/* Loader Spinner */}
      {loading ? (
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
          </button>
          <span>Plase wait the news are loading</span>
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
      ) : (
        <>
          {/* Carousel Indicators */}
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

          {/* Carousel Inner */}
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                data-bs-interval={index === 0 ? "5000" : "3000"} // Increased interval for better loading time
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
                  </button>
                  <span>{slide.label}</span>
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
                <div className="carousel-slide-content">
                  {loading ? (
                    <div className="flex flex-row gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  ) : (
                    slide.content
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
