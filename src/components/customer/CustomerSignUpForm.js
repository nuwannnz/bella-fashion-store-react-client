import React from "react";
import "../../styles/CustomerSignUpPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function CustomerSignUpForm() {
    return (
        <div className="sign-up-form-wrapper">
            <div className="sign-up-form">
                <h1>Create Account</h1>
                <div className="logo">
                    <img src={getAssetUrl("logo/logo.png")} alt="Bella logo"/>
                </div>

                <div className="fullName">
                    <div><FaUser color="#8c52ff"/></div>
                    <input type="text" placeholder="Ex: Anjana Kumari"/>
                </div>
                <div className="email">
                    <div><FaEnvelope color="#8c52ff" /></div> 
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="password">
                    <div><FaLock color="#8c52ff" /></div>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="sign-up-btn">
                    <button>SIGN UP</button>
                </div>
            </div>
        </div>
    );
}
