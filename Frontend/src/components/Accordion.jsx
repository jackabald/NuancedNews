import React from "react";
import "./Accordion.css";
import Article from "./Article";
import { groupNewsBySource } from "./utils";


const Accordion = ({news}) => {
  const groupedNews = groupNewsBySource(news);

  return (
    <div className="acc-wraper">
      <div className="accordion">
        {groupedNews["NYT"] && (
          <div>
            <h1>NYT</h1>
            {groupedNews["NYT"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
        <div>
          <img
            src="https://image.freepik.com/free-photo/sunlight-forest_1004-9.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://image.freepik.com/free-photo/beautiful-green-park_1417-1443.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://image.freepik.com/free-photo/waterfall-that-is-layer-thailand_1150-15650.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://image.freepik.com/free-photo/sunrise-bali-jungle_1385-1644.jpg"
            alt=""
          ></img>
        </div>
        <div>
          <img
            src="https://image.freepik.com/free-photo/grass-with-sunlight-countryside-suburban_53876-42989.jpg"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
