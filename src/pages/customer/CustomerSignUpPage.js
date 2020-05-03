import React from "react";
import CustomerSignUpForm from "../../components/customer/CustomerSignUpForm";
import CustomerSignInMsg from "../../components/customer/CustomerLoginMsg";
// import { useDispatch, useSelector } from "react-redux";
import { signUpCustomerAsync } from "../../redux/actions/customer/customer.actions";

export default function CustomerSignUpPage() {
    
    return (
        <div className="sign-up-container">
                <CustomerSignInMsg />
                <CustomerSignUpForm />
        </div>
    );
}