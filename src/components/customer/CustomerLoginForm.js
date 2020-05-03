import React, { useState } from "react";
import "../../styles/CustomerLoginPage.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { getAssetUrl } from "../../helpers/assets.helper";
import InputBox from '../common/InputBox';
import ErrorMessage from "../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";


export default function CustomerLoginForm({onLoginClick, forgotPwdUrl, hasError}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidInput, setInvalidInput] = useState("");

    const submitForm = () => {
        if(!isValidEmail(email)) {
            setInvalidInput("Invalid email address");
        } else if(isEmpty(password)) {
            setInvalidInput("Password is required");
        } else {
            setInvalidInput("");
            onLoginClick(email, password);
        }
    }

    const onButtonClick = submitForm;

    return (
        <div className="customer-login-form-wrapper">
            <div className="login-form">
                <h1>Sign in to Bella Fashion Store</h1>
                <div className="login-page-logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo"/>
                </div>
                
                <div className="login-form-wrap">
                    <div className="login-email">
                        <div><FaEnvelope color="#8c52ff" /></div>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => {
                                
                            }}
                            />
                    </div>

                    <div className="login-password">
                        <div><FaLock color="#8c52ff" /></div>
                        <input type="password" placeholder="Password"/>
                    </div>

                    <div className="forgot-pwd">
                        <a href>Forgot password?</a>
                    </div>

                    <div className="login-signup-btn">
                        <button>SIGN UP</button>
                    </div>
                </div>
                
            </div>
        </div>                
    );

}