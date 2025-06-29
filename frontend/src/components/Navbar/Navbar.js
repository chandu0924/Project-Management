// src/components/Layout/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './Navbar.css';
import GlobalSearch from '../GlobalSearch/GlobalSearch';

const Navbar = () => {
  const cookies = new Cookies();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">MyCompany</div>

      <div className="navbar-right">
        <GlobalSearch 
          className="global-search"
        />
        <div className="dropdown">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
            Profile
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>Profile</li>
              <li>Settings</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
