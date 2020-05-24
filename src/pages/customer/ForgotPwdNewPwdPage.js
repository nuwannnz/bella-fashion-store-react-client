import React from "react";
import "../../styles/customer/ForgotPwdPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { useParams } from "react-router-dom";

export default function ForgotPwdNewPwdPage() {
  return (
    <div className="forgot-pwd-wrapper">
      <div className="forgot-pwd-new-pwd-card">
        <div className="title">
          <h2>Reset your password</h2>
        </div>
        <div className="logo">
          <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
        </div>

        <div>
          <p>Please choose a new password to finish signing in.</p>
        </div>

        <div className="pwd">
          <input type="password" placeholder="New Password" />
        </div>

        <div className="pwd">
          <input type="password" placeholder="Re-enter new password" />
        </div>

        <div className="change-pwd-btn">
          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
}
