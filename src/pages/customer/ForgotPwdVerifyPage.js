import React, { useState, useEffect } from "react";
import "../../styles/customer/ForgotPwdPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { useHistory, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { checkCode } from "../../services/customer/customerForgotPassword.service";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function ForgotPwdVerifyPage() {
  const history = useHistory();

  const { email } = useParams();

  const [code, setcode] = useState("");
  const [error, setError] = useState(false);

  const handleCode = (e) => {
    setcode(e.target.value);
  };

  useEffect(() => {
    console.log(email);
  }, []);

  const handleForgotPwdVerifyCode = async () => {
    const result = await checkCode(email, code);

    if (result) {
      history.push(ROUTE_PATHS.CUSTOMER_FORGOT_PWD_NEW_PWD);
    } else {
      throw setError(true);
    }
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
          <input type="text" placeholder="Enter code" onChange={handleCode} />
        </div>

        {error ? <ErrorMessage msg="Code does not match" /> : null}

        <div className="next-btn">
          <button onClick={handleForgotPwdVerifyCode}>Next</button>
        </div>
      </div>
    </div>
  );
}
