import React, { useState } from "react";
import "../../styles/CustomerLoginForm.css";
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
        <div>
            <div className="customer-login-form-wrapper"> 
                <h1 className="sign-in-text">Sign in to Bella Fashion Store</h1>
                <img src={getAssetUrl("logo/logo.png")} alt="Bella logo"/>
                
                <div className="input-box-wrap">
                    <div className="email-icon">
                        <FaEnvelope color="#8c52ff" />
                    </div>  

                    <InputBox 
                        placeholder="Email" 
                        type="email"
                        name="email"
                        onTextChange={text => setEmail(text)}
                    />

                    <div className="password-icon">
                        <FaLock color="#8c52ff" />
                    </div>  
                    
                    <InputBox 
                        placeholder="Password" 
                        type="password"
                        name="password"
                        onTextChange={text => setPassword(text)}
                    />

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
                                        
                    <div className="forgot-pwd">
                        <a href={forgotPwdUrl}>Forgot your Password?</a>
                    </div>

                    <div className="sign-in-wrap">
                        <button 
                            className="sign-in-btn"
                            onClick={() => {
                                if(onButtonClick !== null) {
                                    onButtonClick();
                                }
                            }}>SIGN IN</button>
                        
                        
                    </div>
                </div>
            </div>
        </div>                
    );

}