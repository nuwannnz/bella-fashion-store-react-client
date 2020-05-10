import React from "react";
import CustomerLoginForm from "../../components/customer/CustomerLoginForm";
import CustomerSignUpMsg from "../../components/customer/CustomerSignUpMsg";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/actions/customer/customer.actions";
import "../../styles/customer/CustomerLoginPage.css";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function CustomerLoginPage() {
 
  const dispatch = useDispatch();
  const location = useLocation();
  const hasLoginError = useSelector(state => state.customer.hasLogginError);
  const history = useHistory();
  const token = useSelector(state => state.customer.token);
  const {from} = location.state || { from :{pathname : ROUTE_PATHS.CUSTOMER_DASHBOARD}}

  return (
    token !== null  ? (
      <Redirect to={from.pathname} />
    ):(
      <div className="login-container">
        <CustomerLoginForm 
          forgotPwdUrl={"#"}
          hasError={hasLoginError}
          onLoginClick={(email, password) => {
            dispatch(loginAsync(email, password, history))
          }}
        />
        <CustomerSignUpMsg />
    </div>
    )
  );
}
