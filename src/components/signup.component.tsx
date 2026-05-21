import React from "react";
import type { LoginFormProps } from "../types/types";
import { Link } from "react-router-dom";
import { mockSignUp } from "../services/authService";

const SignUpComponent: React.FC<LoginFormProps> = ({ onClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await mockSignUp({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return (
      <div className="success-message-container" onClick={onClose}>
        <div className="success-message" onClick={(e) => e.stopPropagation()}>
          <h2>Success! 🎉</h2>
          <p>Your account has been created. You can now log in.</p>
          <button onClick={onClose} className="close-btn">
            x Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="signup-container" onClick={onClose}>
      <div className="signup-form" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="checkbox-show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              disabled={loading}
            />
            <label>Show Password</label>
          </div>
          <button
            type="submit"
            className="signup-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
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
