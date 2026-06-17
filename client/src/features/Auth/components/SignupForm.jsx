import React from "react";
import "./SignupForm.css";
import { registerUser } from "../../../services/apiCalls";  
import { useState } from "react";

function SignupForm({setData, setTostMsg}) {

  const [formData, setFormData] = useState({
    name: "",
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
    const data = await registerUser(formData);
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
        
        <button type="submit" className="auth-submit-btn" id="signup-submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
