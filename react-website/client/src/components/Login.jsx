import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Phone:", phone);
    console.log("Password:", password);

    // Login logic goes here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="one">
          <h1>
            Welcome back User, Please sign in to your account to continue
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 id="sing">Sign in with your phone number</h3>

          <input
            className="sec"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength="10"
            required
          />

          <input
            className="thi"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;