// DEPENDENCIES
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

// STYLES
import "./Navbar.css";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar-horizontal">
      <Link to="/">
        <button>Home</button>
      </Link>
    
    {/* to move after isLoggedIn once auth is working */}
      <Link to="/budgets"> 
          <button> Budgets </button>
        </Link>


      {isLoggedIn && (
        <>
        
          <button onClick={logOutUser}>Logout</button>

          <Link to="/profile">
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Login/Sign Up</button>{" "}
          </Link>
         
        </>
      )}
    </nav>
  );
}

export default Navbar;
