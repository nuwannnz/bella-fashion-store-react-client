import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardDetailsPage.css";
import CustomerDashboardDetailsForm from "../../components/customer/CustomerDashboardDetailsForm";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomerPasswordAsync } from "../../redux/actions/customer/customer.actions";

export default function CustomerDashboardDetailsPage() {
    const dispatch = useDispatch();
    const customer = useSelector((state) => state.customer.customerInfo);

    return (
        <div className="customer-dashboard-details-wrapper">
            <div className="title">
                <h1>Account Details</h1>    
            </div>
            <CustomerDashboardDetailsForm 
                getCustomer={customer}
                onUpdateClick={(currentPwd, newPwd) => {
                    dispatch(updateCustomerPasswordAsync(currentPwd, newPwd)) 
                }}
                />
        </div>
    )
}