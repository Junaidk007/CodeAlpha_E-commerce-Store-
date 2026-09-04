import React, { useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function SignupForm({ signUp, loading }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formData);
    console.log(formData)

  }
  

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
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="auth-submit-btn" id="signup-submit-btn" disabled={loading}>
          {loading ? <CircularProgress size="1rem"  color="inherit" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
