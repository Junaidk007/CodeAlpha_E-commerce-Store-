import React from "react";
import "./LoginForm.css";

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission handler (can be integrated with auth services later)
  };

  return (
    <div className="login-form-container" id="login-form-container">
      <h2 className="auth-form-title">SIGN IN</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="login-email">EMAIL</label>
          <input
            type="email"
            id="login-email"
            placeholder="email@email.com"
            required
            className="auth-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">PASSWORD</label>
          <input
            type="password"
            id="login-password"
            placeholder="••••••••"
            required
            className="auth-input"
          />
        </div>

        <button type="submit" className="auth-submit-btn" id="login-submit-btn">
          Sign In
        </button>
      </form>

      <div className="forgot-password-link-container">
        <a href="#forgot" className="forgot-password-link">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
