import { Link } from "react-router-dom";
import Header from "./Header";
import "./css/Home.css";
import image from "../assets/sherpa.png";
import userContext from "../context/UserContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(userContext);
  return (
    <div className="Home">
      <Header />
      <div className="home-content">
        <div id="img-container">
          <img src={image} />
        </div>
        <h2>
          Finding remote work can be an uphill task. <br />
          Relax and let <span>Sherpa</span> lead the way!
        </h2>
        <Link to="/jobs">
          <button>Look for a job</button>
        </Link>
        {user && (
          <Link to="/tracker">
            <button>Manage your applications</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
