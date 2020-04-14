import React, { useState } from "react";

export default function LoginForm({ onLoginClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form-wrapper">
      <div className="form-element-wrapper">
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-element-wrapper">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        className="bella-accent-btn"
        onClick={() => {
          onLoginClick(email, password);
        }}
      >
        Login
      </button>
    </div>
  );
}
