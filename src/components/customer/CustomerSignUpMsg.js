import React from "react";
import "../../styles/CustomerLoginPage.css";
import { useHistory, Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function CustomerSignUpMsg() {
    const history = useHistory();
    return (
        <div className="sign-up-msg-wrapper">
            <div className="sign-up-msg">
                <p>Hi, There!</p>
                <p>
                    Enter your personal details
                    and start journey with us.
                </p>
                <div className="sign-up-msg-btn">
                    <button onClick={() => {
                        history.push(ROUTE_PATHS.CUSTOMER_SIGNUP);
                    }}>SIGN UP</button>
                </div>

                <Link to={ROUTE_PATHS.CUSTOMER_SHELL}>
                    <button className="go-home-btn">
                        Go to Homepage
                </button>
                </Link>
            </div>
        </div>
    );
}

