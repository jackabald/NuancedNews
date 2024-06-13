import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navMenu">
      <a href="/">Home</a>
      <a href="/profile">Profile</a>
      <a href="/more">More</a>
      <a href="/about">Why?</a>
      <div className="dot"></div>
    </nav>
  );
};

export default Navbar;
