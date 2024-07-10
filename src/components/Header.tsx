import { Link } from "react-router-dom";
import "./css/Header.css";
import logo from "../assets/logo.png";
import { signInWithGoogle, signOutOfGoogle } from "../firebaseConfig";
import { useContext } from "react";
import userContext from "../context/UserContext";

const Header = () => {
  const { user } = useContext(userContext);

  return (
    <div className="Header">
      <img src={logo} />
      <h1>herpa</h1>
      <nav className="nav-bar">
        {user === null ? (
          <button onClick={signInWithGoogle} id="sign-in">
            Sign in with Google
          </button>
        ) : (
          <>
            <div className="user-deets">
              <p>Hi, {user.displayName}!</p>
              <button onClick={signOutOfGoogle} id="sing-out">
                Sign Out
              </button>
            </div>
            <div className="nav-links">
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/jobs" className="link">
                Job Board
              </Link>
              <Link to="/tracker" className="link">
                Tracker
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
