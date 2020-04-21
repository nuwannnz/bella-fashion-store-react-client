import React, { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";

export default function LoginForm({ onLoginClick, forgotPwdUrl, hasError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidInput, setInvalidInput] = useState("");



  const submitForm = () => {

    if (!isValidEmail(email)) {
      setInvalidInput("Invalid email address");
    } else if (isEmpty(password)) {
      setInvalidInput("Password is required");
    } else {
      setInvalidInput("");
      onLoginClick(email, password);
    }


  }

  return (
    <div className="login-form-wrapper">
      <div className="form-element-wrapper ">
        <label className="animate-label">Email</label>
        <input
          className="textual-form-element"
          type="text"
          name="email"
          placeholder="Enter email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-element-wrapper">
        <label className="animate-label"> Password</label>
        <input
          className="textual-form-element"
          type="password"
          name="password"
          placeholder="Enter password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      {
        invalidInput.length > 0 ?
          <ErrorMessage msg={invalidInput} />
          : null
      }

      {hasError ?
        <ErrorMessage msg={"Invalid email and password combination"} />
        : null
      }

      <div className="form-misc-wrapper">
        <a href={forgotPwdUrl}>Forgot password?</a>
      </div>

      <button
        className="bella-accent-btn"
        onClick={submitForm}
      >
        Login
      </button>
    </div>
  );
}
