import React, { useState } from "react";
import "../../styles/CustomerLoginPage.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { getAssetUrl } from "../../helpers/assets.helper";
import ErrorMessage from "../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";
import AccentButton from "../common/AccentButton";


export default function CustomerLoginForm({ onLoginClick, forgotPwdUrl, hasError, isLoading = false }) {
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

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPwdChange = e => {
        setPassword(e.target.value);
    };


    return (
        <div className="customer-login-form-wrapper">
            <div className="login-form">
                <p>Sign in to Bella Fashion Store</p>
                <div className="login-page-logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
                </div>

                <div className="login-form-wrap">
                    <div className="login-email">
                        <div><FaEnvelope color="#8c52ff" /></div>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={onEmailChange}
                        />
                    </div>

                    <div className="login-password">
                        <div><FaLock color="#8c52ff" /></div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={onPwdChange}
                        />
                    </div>

                    <div className="forgot-pwd">
                        <a href={forgotPwdUrl}>Forgot password?</a>
                    </div>
                    {
                        invalidInput.length > 0 ?
                            <ErrorMessage msg={invalidInput} />
                            : null
                    }

                    {
                        hasError ?
                            <ErrorMessage msg={"Invalid email and password combination"} />
                            : null
                    }

                    <div className="login-signup-btn">
                        <AccentButton onButtonClick={() => {
                            if (submitForm !== null) {
                                submitForm();
                            }
                        }}
                            isLoading={isLoading}>SIGN IN</AccentButton>
                    </div>
                </div>


            </div>
        </div>
    );

}