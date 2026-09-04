import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function LoginForm({ signIn, user, token, loading }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(formData);
    console.log(user , token);
    if(token) navigate("/");
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
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="auth-submit-btn" id="login-submit-btn" disabled={loading}>
          {loading ? <CircularProgress size="1rem"  color="inherit" /> : "Sign In"}
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
