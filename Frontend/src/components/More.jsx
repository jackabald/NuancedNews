import React from "react";
import Carousel from "./Carousel.jsx";

const More = ({ news }) => {
  return (
    <div className="more">
      <Carousel news={news} />
    </div>
  );
};

export default More;
