import React from "react";
import type { SignUpFormProps } from "../types/types";
import { signUpUser } from "../services/auth.service";

const SignUpComponent: React.FC<SignUpFormProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const response = await signUpUser(firstName, lastName, email, password);

    if (response.success) {
      // 1. Update the success message to give the user clear instructions
      setMessage({
        type: "success",
        text: "Account created! Redirecting to login...",
      });

      // 2. Redirect them to the login page after a short delay
      setTimeout(() => {
        onSwitchToLogin(); // Switch to the login form
      }, 1500);
    } else {
      setMessage({ type: "error", text: response.message });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container" onClick={onClose}>
      <div className="signup-form" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        {message && message.type === "error" && (
          <p className="error-message">{message.text}</p>
        )}
        <form onSubmit={handleSignUp}>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="checkbox-show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              disabled={isSubmitting}
            />
            <label>Show Password</label>
          </div>
          <button
            type="submit"
            className="signup-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <button className="switch-form-btn" onClick={onSwitchToLogin}>
              Log in
            </button>
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
