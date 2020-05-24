import React from "react";
import "../../styles/customer/ForgotPwdPage.css";
import { FaEnvelope } from "react-icons/fa";
import { getAssetUrl } from "../../helpers/assets.helper";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function ForgotPwdEmailPage() {
  const history = useHistory();

  const handleForgotPwdEmail = () => {
    history.push(ROUTE_PATHS.CUSTOMER_FORGOT_PWD_VERIFY);
  };

  return (
    <div className="forgot-pwd-wrapper">
      <div className="forgot-pwd-card">
        <div className="title">
          <h2>Account recovery</h2>
        </div>
        <div className="logo">
          <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
        </div>
        <div>
          <p>Enter the your email using with this Bella Fashion Account</p>
        </div>
        <div className="email">
          <div>
            <FaEnvelope color="#8c52ff" />
          </div>
          <input type="email" placeholder="Email" />
        </div>

        <div className="send-btn">
          <button onClick={handleForgotPwdEmail}>Send</button>
        </div>
      </div>
    </div>
  );
}
