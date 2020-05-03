import React from "react";
import "../../styles/CustomerSignUpPage.css";

export default function CustomerLoginMsg() {
    return (
        <div className="login-msg-wrapper">
            <div className="login-msg">
                <h2>Welcome Back!</h2>
                <p>
                    Enter your personal details 
                    and start journey with us.
                </p>
                <div className="sign-in-btn">
                    <button>SIGN IN</button>
                </div>
            </div>
        </div> 
    );
}