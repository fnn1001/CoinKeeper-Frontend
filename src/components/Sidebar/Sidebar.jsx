// DEPENDENCIES
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//STYLES
import './Sidebar.css';
import { AuthContext } from '../../context/auth.context';

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Sidebar component
const Sidebar = (props) => {
  // State for managing sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  // React Router navigate for programmatic navigation
  const navigate = useNavigate();

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Function to handle link click based on authentication status
  const handleLinkClick = (path) => {
    toggleSidebar();

    // Redirect to signup if not logged in (except for the Login/Sign Up link)
    if (!isLoggedIn && path !== '/signup') {
      navigate('/signup');
    }
  };

  return (
    <>
      {/* Sidebar container */}
      <div className={`sidebar ${sidebarVisible ? 'open' : ''}`}>
        {/* User Greeting */}
        {isLoggedIn && (
          <div className="user-info">
            <span className="user-greeting">
              {user && `Hello, ${capitalizeFirstLetter(user.name)}`}
            </span>
          </div>
        )}

        {/* Navigation links */}
        {/* Navigation links */}
        <Link to="/" className="sidebar-link" onClick={() => handleLinkClick('/')}>
          Home
        </Link>

        {/* My Budgets link */}
        <Link to="/budgets" className="sidebar-link" onClick={() => handleLinkClick('/budgets')}>
          My Budgets
        </Link>

        {/* My Investments link */}
        <Link to="/invest" className="sidebar-link" onClick={() => handleLinkClick('/invest')}>
          My Investments
        </Link>


        {/* Additional links for logged-in users */}
        {isLoggedIn ? (
          <>
            
            <Link to="/" className="sidebar-link">
              <span onClick={logOutUser}>Logout</span>
            </Link>
          </>
        ) : (
          <Link to="/signup" className="sidebar-link">
            <span onClick={() => handleLinkClick('/signup')}>Login/Sign Up</span>
          </Link>
        )}

        
      </div>

      {/* Main content container with dynamic margin based on sidebar visibility */}
      <div id="main" style={{ marginLeft: sidebarVisible ? '250px' : '0' }}>
        {/* Sidebar toggle button */}
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

// Export the Sidebar component
export default Sidebar;