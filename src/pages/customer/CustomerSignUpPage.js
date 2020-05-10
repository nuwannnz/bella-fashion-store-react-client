import React from "react";
import CustomerSignUpForm from "../../components/customer/CustomerSignUpForm";
import CustomerSignInMsg from "../../components/customer/CustomerLoginMsg";
import { useDispatch, useSelector } from "react-redux";
import { signUpCustomerAsync } from "../../redux/actions/customer/customer.actions";

export default function CustomerSignUpPage() {
    
    const dispatch = useDispatch();
    const hasSignUpError = useSelector(state => state.customer.hasSignUpError);

    return (
        <div className="sign-up-container">
                <CustomerSignInMsg />
                <CustomerSignUpForm 
                    hasError={hasSignUpError}
                    onSignUpClick={(fullName, email, password) => {
                        dispatch(signUpCustomerAsync(fullName, email, password))
                    }}
                />
        </div>
    );
}