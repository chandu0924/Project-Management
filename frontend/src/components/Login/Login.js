import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;
      console.log("url", url)
      const response = await axios.post(url, { email, password }, {withCredentials: true});

      const { token } = response.data;
      setCookie("token", token, { path: "/" });

      setError("");
      navigate("/"); // ✅ Redirect to homepage
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="login-input"
          placeholder="user@domain.tld"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="login-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>
        {error && <p className="login-error">Error: {error}</p>}
      </form>

      <p className="login-register-text">
        Don't have an account?{" "}
        <Link to="/register" className="login-register-link">Register here</Link>
      </p>
    </div>
  );
}
