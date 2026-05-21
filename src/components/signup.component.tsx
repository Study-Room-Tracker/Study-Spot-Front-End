import React from "react";
import type { LoginFormProps } from "../types/types";
import { Link } from "react-router-dom";

const SignUpComponent: React.FC<LoginFormProps> = ({ onClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the sign-up logic, such as sending a request to your backend API
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    // After successful sign-up, you can close the form
    onClose();
  };
  return (
    <div className="signup-container" onClick={onClose}>
      <div className="signup-form" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first-name" className="signup-required-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
          <label htmlFor="last-name" className="signup-required-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
          <label htmlFor="email" className="signup-required-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password" className="signup-required-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
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
          <button type="submit" className="signup-submit-btn">
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
        <button className="signup-close-btn" onClick={onClose}>
          x Close
        </button>
      </div>
    </div>
  );
};

export default SignUpComponent;
