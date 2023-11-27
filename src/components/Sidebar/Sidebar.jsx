import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Invest from '../../pages/Investment/Invest';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn, logOutUser, user }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className={`sidebar ${sidebarVisible ? 'open' : ''}`}>
        <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
          Home
        </Link>
        <Link to="/budgets" className="sidebar-link" onClick={toggleSidebar}>
          My budgets
        </Link>

        {/* Add more navigation links as needed */}
        {isLoggedIn && (
          <>
            <Link to="/profile" className="sidebar-link" onClick={toggleSidebar}>
              Profile
            </Link>
            <button onClick={logOutUser} className="sidebar-link">
              Logout
            </button>
            <span>{user && user.name}</span>
          </>
        )}
            <Link to="/invest" className="sidebar-link" onClick={toggleSidebar}>
              My Investments
            </Link>

        {!isLoggedIn && (
          <Link to="/signup" className="sidebar-link" onClick={toggleSidebar}>
            Login/Sign Up
          </Link>
        )}
      </div>

      <div id="main" style={{ marginLeft: sidebarVisible ? '250px' : '0' }}>
        <div className="sidebar-navbar">
          <button className={`menu-btn ${sidebarVisible ? 'open' : ''}`} onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
