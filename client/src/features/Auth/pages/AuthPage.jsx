import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Toast from "../../../components/Toast"  
import "./AuthPage.css";
import useAuth from "../../../hooks/useAuth.js";
import useGlobal from "../../../hooks/useGlobal.js";

function AuthPage() {
  const { user, token, signUp, signIn } = useAuth();
  const { loading } = useGlobal();
  const [isMobile, setIsMobile] = useState(false);
  const [activeForm, setActiveForm] = useState("signin"); // 'signin' or 'signup'



  // Screen size detector hook for responsive conditional rendering
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initialize check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="auth-page-wrapper" id="auth-page-wrapper">
      <h1 className="auth-welcome-header">Welcome!</h1>

      {isMobile ? (
        // Mobile Conditional Rendering
        <div className="auth-mobile-container" id="auth-mobile-container">
          {/* Custom Slide Toggle Tab Switcher */}
          <div className="auth-mobile-switcher">
            <div className={`switcher-pill ${activeForm}`} />
            <button
              className={`switcher-tab ${activeForm === "signin" ? "active" : ""}`}
              onClick={() => setActiveForm("signin")}
              id="mobile-tab-signin"
            >
              Sign In
            </button>
            <button
              className={`switcher-tab ${activeForm === "signup" ? "active" : ""}`}
              onClick={() => setActiveForm("signup")}
              id="mobile-tab-signup"
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form-fade-in">
            {activeForm === "signin" ? (
              <LoginForm signIn={signIn} user={user} token={token} loading={loading}/>
            ) : (
              <SignupForm signUp={signUp} loading={loading}/>
            )}
          </div>
        </div>
      ) : (
        // Desktop Grid (Both side-by-side)
        <div className="auth-desktop-grid" id="auth-desktop-grid">
          <div className="auth-grid-column">
            <LoginForm signIn={signIn} user={user} token={token} loading={loading}/>
          </div>
          <div className="auth-grid-column">
            <SignupForm signUp={signUp} loading={loading}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPage;