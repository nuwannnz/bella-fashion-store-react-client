import React, { useState } from "react";
import ErrorMessage from "../../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../../helpers/input-validation.helper";
import TextBox from '../../common/TextBox';
import AccentButton from '../../common/AccentButton';

export default function LoginForm({ onLoginClick, forgotPwdUrl, errorMsg = "", isLoading }) {
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


      <TextBox
        onTextChange={text => setEmail(text)}
        placeholder="Enter email here"
        name="email"
        label="Email"
      />
      <TextBox
        onTextChange={text => setPassword(text)}
        placeholder="Enter password here"
        name="password"
        label="Password"
        type="password"
      />


      {
        invalidInput.length > 0 ?
          <ErrorMessage msg={invalidInput} />
          : null
      }

      {errorMsg && errorMsg.length > 0 ?
        <ErrorMessage msg={errorMsg} />
        : null
      }

      <div className="form-misc-wrapper">
        <a href={forgotPwdUrl}>Forgot password?</a>
      </div>

      <AccentButton
        text="Login"
        onButtonClick={submitForm}
      />

    </div>
  );
}
