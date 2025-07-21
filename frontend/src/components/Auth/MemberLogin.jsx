import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';

export default function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role: "member",
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "member");

      navigate("/member/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid member credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Member Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Member Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Member Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
