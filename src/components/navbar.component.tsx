import { Link } from "react-router-dom";
import React from "react";
import LoginComponent from "./login.component";
import SignUpComponent from "./signup.component";

const NavbarComponent = () => {
  const [activeMenu, setActiveMenu] = React.useState<"login" | "signup" | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };
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

        {isLoggedIn ? (
          <button className="nav-button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            {" "}
            <button
              className="nav-button"
              onClick={() => setActiveMenu("login")}
            >
              Log in
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveMenu("signup")}
            >
              Sign Up
            </button>
          </>
        )}

        {activeMenu === "login" && (
          <LoginComponent
            onClose={() => setActiveMenu(null)}
            onSwitchToSignUp={() => setActiveMenu("signup")}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        )}

        {activeMenu === "signup" && (
          <SignUpComponent
            onClose={() => setActiveMenu(null)}
            onSwitchToLogin={() => setActiveMenu("login")}
          />
        )}
      </nav>
    </header>
  );
};

export default NavbarComponent;
