import React from "react";
import LoginForm from "../../../components/admin/LoginForm";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();

  return (
    <div className="login-page-wrap flex-center flex-c">
      <div className="logo">
        <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
      </div>
      <LoginForm
        onLoginClick={(email, password) =>
          dispatch(loginAsync(email, password))
        }
      />
    </div>
  );
}
