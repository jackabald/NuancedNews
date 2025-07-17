import React from "react";
import "./NewsCards.css";
import Article from "./Article";
import { groupNewsBySource } from "./utils";
import { Card, Container, Row, Col } from "react-bootstrap";

// Map of normalized logo filenames (without extension) to hex colors
const logoBackgroundColors = {
  BBC: "#040404",
  CNN: "#c90404",
  Daily_Wire: "#2f2626",
  Fox_News: "#083463",
  Grayzone: "#000000",
  Guardian: "#042b63",
  New_Yorker: "#ffffff",
  NPR: "#e4e4eb",
  NYT: "#040404",
  NY_Post: "#cb0404",
  Washington_Examiner: "#040404",
  WSJ: "#ffffff"
};

function getLogoBackgroundColor(source) {
  // Extract the source name after " | ", fallback to entire string
  const sourceName = source.split(" | ").pop().trim();

  // Normalize to match keys in logoBackgroundColors (replace spaces with _)
  const normalizedName = sourceName.replace(/\s+/g, "_");

  return logoBackgroundColors[normalizedName] || "#cccccc"; // fallback gray
}

const NewsCards = ({ news }) => {
  const groupedNews = groupNewsBySource(news);

  return (
    <Container fluid>
      <Row>
        {Object.entries(groupedNews).map(([source, { articles, logo }]) => (
          <Col md={6} key={source} className="news-column">
            <div className="news-section">
              <div
                className="logo-container"
                style={{ backgroundColor: getLogoBackgroundColor(source) }}
              >
                <img
                  src={`/logos/${source.replace(/[^a-zA-Z0-9_-]/g, "_")}.png`}
                  onError={e => (e.target.src = "/assets/img/default.png")}
                  height={300}
                  width={300}
                  alt={source}
                />
              </div>
              <div className="news-content">
                <h2>{source}</h2>
                <div className="news-list">
                  {articles.map((article, index) => (
                    <Card key={index} className="news-card">
                      <Card.Body>
                        <Article {...article} source={source} />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsCards;
