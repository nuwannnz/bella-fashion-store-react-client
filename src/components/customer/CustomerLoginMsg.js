import React from "react";
import "../../styles/CustomerSignUpPage.css";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function CustomerLoginMsg() {
    const history = useHistory();
    return (
        <div className="login-msg-wrapper">
            <div className="login-msg">
                <p>Welcome Back!</p>
                <p>
                    Enter your personal details 
                    and start journey with us.
                </p>
                <div className="sign-in-btn">
                    <button onClick={() => {
                        history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
                    }}>SIGN IN</button>
                </div>
            </div>
        </div> 
    );
}