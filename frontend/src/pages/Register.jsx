// frontend/src/components/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../requester.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password });
      setMessage("✅ Registration successful! Please login.");
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {message && <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`} role="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
        <p className="mt-3 text-center">Already have an account? <a href="/">Login here</a></p>
      </form>
    </div>
  );
};

export default Register;
