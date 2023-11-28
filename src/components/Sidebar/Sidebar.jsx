// Import necessary components and styles
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { AuthContext } from '../../context/auth.context';

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
        {/* Navigation links */}
        <Link to="/" className="sidebar-link" onClick={() => handleLinkClick('/')}>
          Home
        </Link>
        <Link to="/budgets" className="sidebar-link" onClick={() => handleLinkClick('/budgets')}>
          My budgets
        </Link>

        {/* Additional links for logged-in users */}
        {isLoggedIn && (
          <>
            <Link to="/profile" className="sidebar-link" onClick={() => handleLinkClick('/profile')}>
              Profile
            </Link>
            <div className="user-info">
              <span>{user && user.name}</span>
              <button onClick={logOutUser} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        )}

        {/* Investment link */}
        <Link to="/invest" className="sidebar-link" onClick={() => handleLinkClick('/invest')}>
          My Investments
        </Link>

        {/* Login/Sign Up or Logout link based on authentication status */}
        {!isLoggedIn ? (
          <Link to="/signup" className="sidebar-link">
            <span onClick={() => handleLinkClick('/signup')}>Login/Sign Up</span>
          </Link>
        ) : (
          <button onClick={logOutUser} className="sidebar-link">
            Logout
          </button>
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
