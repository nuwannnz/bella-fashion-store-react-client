import React from "react";
import LoginForm from "../../../components/admin/forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";
import SuccessMessage from "../../../components/common/SuccessMessage";
import { Redirect, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants";

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
  const successMsg = useSelector(state => state.staffLogin.ui.successMsg);
  const isLoading = useSelector(state => state.staffLogin.ui.isLoading);

  const { from } = location.state || { from: { pathname: ROUTE_PATHS.ADMIN_DASHBOARD } };

  const token = useSelector(state => state.staffLogin.auth.token);
  const hasAdmin = useSelector(state => state.staffLogin.ui.hasAdmin);



  return (

    token !== null ?
      (
        <Redirect to={from.pathname} />
      ) : (

        !hasAdmin ? (<Redirect to={ROUTE_PATHS.ADMIN_SIGNUP} />) :


          (<div className="page login-page-wrap flex align-center flex-c">
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
          </div >)
      )
  );
}
