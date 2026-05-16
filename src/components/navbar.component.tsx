import { Link } from "react-router-dom";

const NavbarComponent: React.FC = () => {
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
        <Link to="/login">
          <button className="nav-button">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="nav-button">Sign Up</button>
        </Link>
      </nav>
    </header>
  );
};

export default NavbarComponent;
