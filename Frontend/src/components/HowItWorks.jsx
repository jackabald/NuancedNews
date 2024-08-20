import React from "react";
import HowItWorksImg from "../assets/img/howitworks.png";
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <div className="how-it-works-section">
            <div className="banner">
                <div className="how-it-works-content">
                    <h1>How It Works</h1>
                    <p>
                        Nuanced News is a news aggregator that collects articles from various sources in real-time.
                        We gather updates from news organizations, blogs, and other media outlets, displaying all these feeds in one place on our website.
                        If we don't currently support a source you'd like to see, you can easily add it yourself on our GitHub repository!
                    </p>
                </div>
                <img
                    src={HowItWorksImg}
                    alt="How It Works Banner"
                    className="how-it-works-image"
                />
            </div>
        </div>
    );
};

export default HowItWorks;