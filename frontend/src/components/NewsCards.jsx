import React from "react";
import "./NewsCards.css";
import Article from "./Article";
import { groupNewsBySource } from "./utils";
import { Card, Container, Row, Col } from "react-bootstrap";


const NewsCards = ({ news }) => {
    const groupedNews = groupNewsBySource(news);
    return (
        <Container fluid>
            <Row>
                {console.log(groupedNews)}
                {Object.entries(groupedNews).map(([source, { articles, logo }]) => (
                    <Col md={6} key={source} className="news-column">
                        <div className="news-section">
                            <div className="logo-container">
                                <img src={logo || "src/assets/img/default.png"} height= {300} width={300} alt={source} />
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

export default NewsCards