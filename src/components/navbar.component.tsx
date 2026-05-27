import { Link, useNavigate } from "react-router-dom";
import React from "react";
import LoginComponent from "./login.component";
import SignUpComponent from "./signup.component";

interface NavbarComponentProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setUserRole: (role: "USER" | "ADMIN" | null) => void;
  activeMenu: "login" | "signup" | null;
  setActiveMenu: (menu: "login" | "signup" | null) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserRole,
  activeMenu,
  setActiveMenu,
}) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    setIsDropdownOpen(false);
    navigate("/landing");
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
          <div className="profile-menu-container">
            <button
              className="profile-icon-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src="src/assets/profile-icon.png" alt="Profile icon" />
            </button>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </button>
                <hr />
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
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
            onLoginSuccess={(role) => {
              setIsLoggedIn(true);
              setUserRole(role);
            }}
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
