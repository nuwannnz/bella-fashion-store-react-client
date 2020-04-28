import React from "react";
import LoginForm from "../../../components/admin/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";
import SuccessMessage from "../../../components/common/SuccessMessage";

export default function LoginPage() {
  const dispatch = useDispatch();
  const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
  const successMsg = useSelector(state => state.staffLogin.ui.successMsg);
  const isLoading = useSelector(state => state.staffLogin.ui.isLoading);


  return (
    <div className="page login-page-wrap flex align-center flex-c">
      <div className="logo">
        <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
      </div>
      <h2>Login to Bella Admin Panel</h2>

      {successMsg.length > 0 ? <SuccessMessage msg={successMsg} /> : null}

      <LoginForm
        forgotPwdUrl={"#"}
        errorMsg={errorMsg}
        isLoading={isLoading}
        onLoginClick={(email, password) =>
          dispatch(loginAsync(email, password))
        }
      />
    </div>
  );
}
