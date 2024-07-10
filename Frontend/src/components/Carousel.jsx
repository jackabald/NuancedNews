import React from "react";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="carousel">
      <form>
        <input type="radio" name="fancy" autoFocus value="Dwire" id="Dwire" />
        <input type="radio" name="fancy" value="TGZ" id="TGZ" />
        <input type="radio" name="fancy" value="WExam" id="WExam" />
        <input type="radio" name="fancy" value="NPR" id="NPR" />
        <label htmlFor="Dwire">Daily Wire</label>
        <label htmlFor="TGZ">The Gray Zone</label>
        <label htmlFor="WExam">Washington Examiner</label>
        <label htmlFor="NPR">NPR</label>
      </form>
    </div>
  );
};

export default Carousel;
