import React from 'react';
import './Footer.css'; 


const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-content"> 
        <div className="footer-links">
          <a href="https://github.com/jackabald/NuancedNews">Contribute</a>
          <a href="https://github.com/jackabald/NuancedNews/blob/main/README.md">Documentation</a>
          <a href="#">Privacy Policy</a>
          <a href="https://github.com/jackabald/NuancedNews/graphs/contributors">Contributors</a>
        </div>
        <p>© 2024 Open Source Project. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
