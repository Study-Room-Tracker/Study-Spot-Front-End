import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <header className="Navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </nav>
    </header>
  );
};

export default NavbarComponent;
