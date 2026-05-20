import { Link } from "react-router-dom";
import React from "react";
import LoginComponent from "./login.component";

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  return (
    <header>
      <Link to="/" className="logo">
        <img
          src="src/assets/study-spot.png"
          alt="This is the logo for Study Spot"
        />
      </Link>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>

        <button className="nav-button" onClick={() => setShowLogin(true)}>
          Log in
        </button>
        {showLogin && <LoginComponent onClose={() => setShowLogin(false)} />}

        <button className="nav-button">Sign Up</button>
      </nav>
    </header>
  );
};

export default NavbarComponent;
