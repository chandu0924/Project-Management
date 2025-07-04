// src/components/Layout/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import './Navbar.css';

const Navbar = () => {
  const cookies = new Cookies();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">MyCompany</div>

      <div className="navbar-right">
        <GlobalSearch className="global-search" />

        <div className="dropdown" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="dropdown-toggle"
          >
            Profile
          </button>

          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item-profile"
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item-profile"
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
              </li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
