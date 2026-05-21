import { Link } from "react-router-dom";
import React from "react";
import LoginComponent from "./login.component";
import SignUpComponent from "./signup.component";

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
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

        <button className="nav-button" onClick={() => setShowSignUp(true)}>
          Sign Up
        </button>
        {showSignUp && <SignUpComponent onClose={() => setShowSignUp(false)} />}
      </nav>
    </header>
  );
};

export default NavbarComponent;
