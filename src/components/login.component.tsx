import React from "react";
import type { LoginFormProps } from "../types/types";

const LoginComponent: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as sending a request to your backend API
    console.log("Email:", email);
    console.log("Password:", password);
    // After successful login, you can close the form
    onClose();
  };
  return (
    // The container-overlay div covers the entire screen and listens for clicks to close the form
    /* Propogation means that when you click on the login form it will not
      reach the container-overlay div and so the form will not close when you
      click inside it*/
    <div className="container-overlay" onClick={onClose}>
      <div className="login-form" onClick={(e) => e.stopPropagation()}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="checkbox-show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label>Show Password</label>
          </div>
          <button type="submit" className="submit-btn">
            Log In
          </button>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
        <button className="close-btn" onClick={onClose}>
          x Close
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
