import { useState, useMemo, useEffect } from "react";
import Article from "./Article";
import { groupNewsBySource } from "./utils";

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const groupedNews = useMemo(() => groupNewsBySource(news), [news]);

  // More columns per row: 1 on xs, 2 on sm, 3 md, 4 lg, 5 xl+
  const renderArticles = (sourceKey) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 p-2">
      {groupedNews[sourceKey]?.articles.map((article, index) => (
        <Article key={index} {...article} />
      ))}
    </div>
  );

  const slides = Object.keys(groupedNews).map((sourceKey) => ({
    label: sourceKey,
    content: renderArticles(sourceKey),
  }));

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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setLoading(false);
    }
  }, [news]);

  return (
    <div className="relative w-full max-w-8xl mx-auto mt-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-sm text-gray-600">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
          <span>Loading news...</span>
        </div>
      ) : (
        <>
          {/* Controls & Label */}
          <div className="flex items-center justify-between mb-2 px-2">
            <button
              onClick={handlePrev}
              className="text-sm px-2 py-1 rounded hover:bg-gray-200 transition"
              aria-label="Previous Slide"
            >
              ◀
            </button>
            <span className="w-full flex justify-center items-center space-x-4 text-lg sm:text-xl font-semibold text-gray-900 tracking-wide select-none">
              <span className="text-sm w-1/3 text-gray-500 cursor-pointer select-text">
                {slides[(activeIndex - 1 + slides.length) % slides.length].label}
              </span>
              <span className="text-base w-1/3 text-center text-blue-600">{slides[activeIndex].label}</span>
              <span className="text-sm w-1/3 text-right text-gray-500 cursor-pointer select-text">
                {slides[(activeIndex + 1) % slides.length].label}
              </span>
            </span>

            <button
              onClick={handleNext}
              className="text-sm px-2 py-1 rounded hover:bg-gray-200 transition"
              aria-label="Next Slide"
            >
              ▶
            </button>
          </div>

          {/* Carousel Content */}
          <div className="">
            {slides[activeIndex]?.content}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-2 space-x-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
