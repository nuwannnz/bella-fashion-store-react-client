import React from "react";
import "../../styles/CustomerLoginPage.css";

export default function CustomerSignUpMsg() {
    return (
        <div className="sign-up-msg-wrapper"> 
            <div className="sign-up-msg">
                <h1>Hi, There!</h1>
                <p>
                    Enter your personal details 
                    and start journey with us.
                </p>
                <div className="sign-up-msg-btn">
                    <button>SIGN UP</button>
                </div>
            </div>
        </div> 
    );
}

