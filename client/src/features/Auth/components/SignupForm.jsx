import React from "react";
import "./SignupForm.css";

function SignupForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission handler
  };

  return (
    <div className="signup-form-container" id="signup-form-container">
      <h2 className="auth-form-title">SIGN UP</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="signup-name">NAME</label>
          <input
            type="text"
            id="signup-name"
            placeholder="Name"
            required
            className="auth-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">EMAIL</label>
          <input
            type="email"
            id="signup-email"
            placeholder="email@email.com"
            required
            className="auth-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">PASSWORD</label>
          <input
            type="password"
            id="signup-password"
            placeholder="••••••••"
            required
            className="auth-input"
          />
        </div>

        {/* <div className="marketing-consent-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="signup-marketing"
              className="custom-checkbox"
            />
            <span className="checkbox-text">
              KEEP ME UP TO DATE WITH SPECIAL OFFERS AND PROMOTION
            </span>
          </label>
        </div> */}

        <button type="submit" className="auth-submit-btn" id="signup-submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
