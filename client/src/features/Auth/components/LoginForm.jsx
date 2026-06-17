import "./LoginForm.css";
import { loginUser } from "../../../services/apiCalls";
import { useState } from "react";

function LoginForm({setData, setTostMsg}) {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      
     try {
      const data = await loginUser(formData);
      setData(data);
      setTostMsg(data?.message)
      console.log(data);
     } catch (error) {
      setData(error.response.data);
      setTostMsg(error.response.data?.message)
      console.log(error);
     }
  
     setTimeout(() => setTostMsg(""), 3000);
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
