import React from "react";
import LoginForm from "../../../components/admin/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const hasLoginError = useSelector(state => state.staff.hasLogginError);
  const isLoading = useSelector(state => state.staff.isLoading);
  console.log('isLoading', isLoading)
  return (
    <div className="page login-page-wrap flex align-center flex-c">
      <div className="logo">
        <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
      </div>
      <h2>Login to Bella Admin Panel</h2>
      <LoginForm
        forgotPwdUrl={"#"}
        hasError={hasLoginError}
        isLoading={isLoading}
        onLoginClick={(email, password) =>
          dispatch(loginAsync(email, password))
        }
      />
    </div>
  );
}
