import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Nuanced News
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/more" className="text-gray-300 hover:text-white transition duration-300">
              More
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-300 hover:text-white transition duration-300">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
