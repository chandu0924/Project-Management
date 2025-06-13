import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/register`

      console.log("url", url)
      // const url = "http://localhost:5000/api/users/register"
      const response = await axios.post(url, { email, password }, {withCredentials: true})

      if(response.status === 201){
        setSuccess("Registration successful! You can now log in.")
        setError("")
        setTimeout(() => {
          navigate("/login");
        }, 1500)
      }
    } catch (err) {
      console.error("Register error:", err)
      setError(err.response?.data?.message || "Registration failed")
      setSuccess("")
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="email" className="register-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="register-input"
          placeholder="user@domain.tld"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="register-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="register-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">Register</button>
        {error && <p className="register-error">Error: {error}</p>}
        {success && <p className="register-success">{success}</p>}
      </form>

      <p className="register-login-text">
        Already have an account?{" "}
        <Link to="/login" className="register-login-link">Login here</Link>
      </p>
    </div>
  )
}
