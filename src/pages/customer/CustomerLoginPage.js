import React from "react";
import CustomerLoginForm from "../../components/customer/CustomerLoginForm";
import CustomerSignUpMsg from "../../components/customer/CustomerSignUpMsg"


export default function CustomerLoginPage() {
 
  return (

    <div className="login-wrapper">
        <div className="center">
            <CustomerLoginForm />
            <CustomerSignUpMsg />
            
        </div>
    </div>
  );
}
