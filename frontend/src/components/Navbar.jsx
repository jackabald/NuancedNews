import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import profile from "../assets/img/profile.svg";

const Navbar = () => {
  const { currentUser, auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    setIsOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    if (currentUser) {
      setIsOpen(!isOpen);
    } else {
      navigate('/profile');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
        >
          Nuanced<span className="text-blue-600">News</span>
        </Link>

        <ul className="flex gap-6 items-center text-sm font-medium relative">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/more" className="text-gray-700 hover:text-blue-600 transition-colors">
              More
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button onClick={handleProfileClick} className="focus:outline-none">
              <img
                src={currentUser?.photoURL || profile}
                alt="Profile Icon"
                className="w-10 h-10 rounded-full border-2 border-transparent transition duration-300 ease-in-out hover:border-blue-600"
              />
            </button>

            {currentUser && isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  User Settings
                </Link>
                <Link
                  to="/bookmarked"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Bookmarked
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
