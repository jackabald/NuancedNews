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
        {groupedNews["CNN"] && (
          <div>
            <h1>CNN</h1>
            {groupedNews["CNN"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
        {groupedNews["WSJ"] && (
          <div>
            <h1>WSJ</h1>
            {groupedNews["WSJ"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
        {groupedNews["FOX"] && (
          <div>
            <h1>FOX</h1>
            {groupedNews["FOX"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
        {groupedNews["NYPost"] && (
          <div>
            <h1>NY Post</h1>
            {groupedNews["NYPost"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
        {groupedNews["Gaurdian"] && (
          <div>
            <h1>Gaurdian</h1>
            {groupedNews["Gaurdian"].map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
