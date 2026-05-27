import React from "react";
import type { LoginFormProps } from "../types/types";
import { mockLogin } from "../services/authService";

const LoginComponent: React.FC<LoginFormProps> = ({
  onClose,
  onSwitchToSignUp,
  onLoginSuccess,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await mockLogin({ email, password });
      if (response.success) {
        localStorage.setItem("authToken", response.token || ""); // Save token to localStorage
        const roleToSave =
          email.toLocaleLowerCase() === "admin@test.com" ? "ADMIN" : "USER"; // Simple role assignment based on email
        localStorage.setItem("userRole", roleToSave); // Save user role in localStorage
        onLoginSuccess(roleToSave); // Pass the user role to the parent component
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    // The container-overlay div covers the entire screen and listens for clicks to close the form
    /* Propogation means that when you click on the login form it will not
      reach the container-overlay div and so the form will not close when you
      click inside it*/
    <div className="container-overlay" onClick={onClose}>
      <div className="login-form" onClick={(e) => e.stopPropagation()}>
        <h2>Log In</h2>
        {error && <p className="login-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-required-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
          <label htmlFor="password" className="login-required-label">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
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
          <button type="submit" className="submit-btn">
            {loading ? "Logging in..." : "Log In"}
          </button>
          <p>
            Don't have an account?{" "}
            <button className="switch-form-btn" onClick={onSwitchToSignUp}>
              Sign Up
            </button>
          </p>
        </form>
        <button className="close-btn" onClick={onClose} disabled={loading}>
          x Close
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
