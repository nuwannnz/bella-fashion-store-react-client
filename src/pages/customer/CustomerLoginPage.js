import React from "react";
import CustomerLoginForm from "../../components/customer/CustomerLoginForm";
import CustomerSignUpMsg from "../../components/customer/CustomerSignUpMsg";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/actions/customer/customer.actions";


export default function CustomerLoginPage() {
 
  const dispatch = useDispatch();
  const hasLoginError = useSelector(state => state.customer.hasLoginError);

  return (

    <div className="login-wrapper">
        <div className="center">
            <CustomerLoginForm 
              forgotPwdUrl={"#"}
              hasError={hasLoginError}
              onLoginClick={(email, password) => {
                dispatch(loginAsync(email, password))
              }}
            />
            <CustomerSignUpMsg />
            
        </div>
    </div>
  );
}
