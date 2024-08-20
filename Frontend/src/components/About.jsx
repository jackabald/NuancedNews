import React from "react";
import Navbar from "./Navbar.jsx"


const About = () => {
  return (
    <div className="about">
      <Navbar />
      <h1 className="my-2">Why?</h1>
      <h2>What's The Point?</h2>
      <p>
        The media serves as the central pillar for disseminating narratives, opinions, and ideas
        worldwide. However, in recent years, it has eroded public trust by propagating false
        narratives and contributing to societal divisions. As the most powerful tool globally,
        the media commands the most influential voice and the most widely viewed images. This
        diminishing trust has driven many individuals to seek alternative information sources.

        At Nuanced News, we recognize the need for a balanced and inclusive media landscape.
        As the founder, I firmly believe that a well-informed world is one where all
        perspectives are represented, and every voice is heard. Our mission is to restore
        faith in journalism by providing comprehensive and unbiased coverage, ensuring that
        our audience receives a complete and nuanced view of the world.
      </p>
      <h2>How It Works</h2>
      <p>
        Nuanced News is a news aggregator that collects articles from various sources in real-time.
        News organizations, blogs, and other media outlets publish RSS feeds that give real-time updates
        on the details of every piece of content a site has published. Nuanced News collects these feeds
        and displays them in a single location, here on our website. Additonally, if Nuanced News doesn't
        support a source you'd like to see, you can add it yourself! checkout the Nuanced News respository
        on Github, fork it, and add the source you'd like to see in the rss_parser.py file (some sources do
        not have supported RSS feeds and are therefore unobtainable).
      </p>
      <h2>Studies:</h2>
      <a href="https://workshop-proceedings.icwsm.org/pdf/2023_25.pdf">Bias or Diversity? Unraveling Fine-Grained Thematic Discrepancy in U.S. News
        Headlines</a>
      <br></br>
      <a href="https://www.exhibit.xavier.edu/cgi/viewcontent.cgi?article=1012&context=xjur">Effect of Media Bias on Credibility of Political
        News</a>
      <br></br>
      <a href="https://www.aeaweb.org/conference/2023/program/2080">Polarization and Media Bias </a>
    </div>
  );
};

export default About;