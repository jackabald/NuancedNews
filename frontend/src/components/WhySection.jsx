import React from "react";
import WhySectionImg from "../assets/img/whysection.png";
import './WhySection.css';

const WhySection = () => {
    return (
        <div className="why-section">
            <div className="banner">
                <img
                    src={WhySectionImg}
                    alt="Nuanced News Banner"
                    className="why-image-img" 
                />
                <div className="why-content">
                    <h1>Why Nuanced News?</h1>
                    <p>
                        The media today has a critical role in shaping opinions and narratives
                        worldwide. Unfortunately, it often propagates bias, leading to a
                        distrust in journalism. At Nuanced News, our mission is to restore
                        trust by offering balanced and inclusive coverage, ensuring every
                        perspective is heard.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default WhySection;
