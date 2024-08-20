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
                {/* Left Column */}
                <Col md={6} className="left-column">
                    {groupedNews["CNN"] && (
                        <div className="news-section">
                            <div className="logo-container">
                                <p>CNN</p>
                            </div>
                            <div className="news-content">
                                <h2>CNN</h2>
                                <div className="news-list">
                                    {groupedNews["CNN"].map((article, index) => (
                                        <Card key={index} className="news-card">
                                            <Card.Body>
                                                <Article {...article} source="CNN" />
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {groupedNews["NYT"] && (
                        <div className="news-section">
                            <div className="logo-container">
                                <p>NYT</p>
                            </div>
                            <div className="news-content">
                                <h2>NYT</h2>
                                <div className="news-list">
                                    {groupedNews["NYT"].map((article, index) => (
                                        <Card key={index} className="news-card">
                                            <Card.Body>
                                                <Article {...article} source="NYT" />
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Col>

                {/* Right Column */}
                <Col md={6} className="right-column">
                    {groupedNews["WSJ"] && (
                        <div className="news-section">
                            <div className="logo-container">
                                <p>WSJ</p>
                            </div>
                            <div className="news-content">
                                <h2>WSJ</h2>
                                <div className="news-list">
                                    {groupedNews["WSJ"].map((article, index) => (
                                        <Card key={index} className="news-card">
                                            <Card.Body>
                                                <Article {...article} source="WSJ" />
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {groupedNews["FOX"] && (
                        <div className="news-section">
                            <div className="logo-container">
                                <p>FOX</p>
                            </div>
                            <div className="news-content">
                                <h2>FOX</h2>
                                <div className="news-list">
                                    {groupedNews["FOX"].map((article, index) => (
                                        <Card key={index} className="news-card">
                                            <Card.Body>
                                                <Article {...article} source="FOX" />
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default NewsCards;
