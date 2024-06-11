import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navMenu">
      <a href="#">Home</a>
      <a href="#">Blog</a>
      <a href="#">Work</a>
      <a href="#">About</a>
      <div className="dot"></div>
    </nav>
  );
};

export default Navbar;
