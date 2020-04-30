import React from "react";
import "../../styles/CustomerLoginForm.css";

export default function CustomerSignUpMsg() {
    return (
        <div className="sign-up-right-wrapper"> 
            <div className="sign-up-content">
                <h2>Hi, There!</h2>
                <p>Enter your personal details 
                    and start journey with us.
                </p>
                <div className="sign-up-btn-wrap">
                    <button className="sign-up-btn">SIGN UP</button>
                </div>
            </div>
        </div> 
        );
}

