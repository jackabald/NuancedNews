import React from "react";
import Carousel from "./Carousel.jsx";

const More = ({ news }) => {
  return (
    <div className="more">
      <h1 className="my-2">More</h1>
      <Carousel news={news} />
    </div>
  );
};

export default More;
