import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const Header = () => {
  const { isSignedIn, toggleLogin } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/" id="header_home_link">
        <h1 id="main_header">^NC News</h1>
      </Link>
      <nav>
        <div id="nav_link_wrap">
          {/* <Link to="/" className='nav_elements'>Home</Link> */}
          <Link to="/articles" className="nav_elements">
            Articles
          </Link>
          <Link to="/topics" className="nav_elements">
            Topics
          </Link>
        </div>
        <div id="sign_in_btn_wrap">
          <button id="sign_in_btn" onClick={toggleLogin}>
            {isSignedIn ? "Sign out" : "Sign in"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
