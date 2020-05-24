import React, { useState } from "react";
import "../../styles/customer/ForgotPwdPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { checkPassword } from "../../services/customer/customerForgotPassword.service";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import { ROUTE_PATHS } from "../../constants";

export default function ForgotPwdNewPwdPage() {
  const [newPwd, setnewPwd] = useState("");
  const [confirmPwd, setconfirmPwd] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [checkedPwd, setCheckedPwd] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const { email } = useParams();

  const handleNewPwd = (e) => {
    setnewPwd(e.target.value);
  };

  const handleConfirmPwd = (e) => {
    setconfirmPwd(e.target.value);
  };

  const handleCustomerNewPwd = async () => {
    if (newPwd === confirmPwd) {
      const result = await checkPassword(email, newPwd);
      if (result.isResultOk()) {
        history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
      } else {
        throw setError(true);
      }
    } else {
      setCheckedPwd(true);
      setInvalidInput("New password is not match from confirm password.");
    }
  };

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
          <input
            type="password"
            placeholder="New Password"
            onChange={handleNewPwd}
          />
        </div>

        <div className="pwd">
          <input
            type="password"
            placeholder="Re-enter new password"
            onChange={handleConfirmPwd}
          />
        </div>

        {checkedPwd ? <ErrorMessage msg={invalidInput} /> : null}

        {error ? (
          <ErrorMessage msg="Password is not insert correctly." />
        ) : null}

        <div className="change-pwd-btn">
          <button onClick={handleCustomerNewPwd}>Change Password</button>
        </div>
      </div>
    </div>
  );
}
