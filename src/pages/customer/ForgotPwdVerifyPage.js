import React from "react";
import "../../styles/customer/ForgotPwdPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function ForgotPwdVerifyPage() {
  const history = useHistory();

  const handleForgotPwdVerifyCode = () => {
    history.push(ROUTE_PATHS.CUSTOMER_FORGOT_PWD_NEW_PWD);
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
          <p>An email with a verfication code was just sent to your email</p>
        </div>

        <div className="verify-code">
          <input type="text" placeholder="Enter code" />
        </div>

        <div className="next-btn">
          <button onClick={handleForgotPwdVerifyCode}>Next</button>
        </div>
      </div>
    </div>
  );
}
