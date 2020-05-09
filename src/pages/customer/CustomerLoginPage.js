import React from "react";
import CustomerLoginForm from "../../components/customer/CustomerLoginForm";
import CustomerSignUpMsg from "../../components/customer/CustomerSignUpMsg";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/actions/customer/customer.actions";
import "../../styles/CustomerLoginPage.css";
import { useHistory, Redirect } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

export default function CustomerLoginPage() {
 
  const dispatch = useDispatch();
  const hasLoginError = useSelector(state => state.customer.hasLoginError);
  const history = useHistory();
  const token = useSelector(state => state.customer.token);
  
  return (
    token !== null  ? (
      <Redirect to={ROUTE_PATHS.CUSTOMER_SHELL
      } />
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
