import React, {useState} from "react";
import "../../styles/CustomerSignUpPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import ErrorMessage from "../common/ErrorMessage";
import { isEmpty, isValidEmail } from "../../helpers/input-validation.helper";

export default function CustomerSignUpForm({onSignUpClick, hasError}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidInput, setInvalidInput] = useState("");
    
    const submitForm = () => {
        if(isEmpty(fullName)) {
            setInvalidInput("Name is required");
        } else if(!isValidEmail(email)) {
            setInvalidInput("Invalid email address");
        } else if(isEmpty(password)) {
            setInvalidInput("Password is required");
        } else {
            setInvalidInput("");
            onSignUpClick(fullName, email, password);
        }
    }

    const onNameChange = e => {
        setFullName(e.target.value);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPwdChange = e => {
        setPassword(e.target.value);
    };

    return (
        <div className="sign-up-form-wrapper">
            <div className="sign-up-form">
                <p>Create Account</p>
                <div className="logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo"/>
                </div>

                <div className="fullName">
                    <div><FaUser color="#8c52ff"/></div>
                    <input 
                        type="text" 
                        placeholder="Ex: Anjana Kumari"
                        onChange={onNameChange}
                        />
                </div>
                <div className="email">
                    <div><FaEnvelope color="#8c52ff" /></div> 
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={onEmailChange}
                        />
                </div>
                <div className="password">
                    <div><FaLock color="#8c52ff" /></div>
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={onPwdChange}
                        />
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

                <div className="sign-up-btn">
                    <button onClick={() => {
                        if(submitForm !== null) {
                            submitForm();
                        }
                    }}>SIGN UP</button>
                </div>
            </div>
        </div>
    );
}
