import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardDetailsPage.css";
import CustomerDashboardDetailsForm from "../../components/customer/CustomerDashboardDetailsForm";
import { useSelector } from "react-redux";

export default function CustomerDashboardDetailsPage() {
    const customer = useSelector((state) => state.customer.customerInfo);

    return (
        <div className="customer-dashboard-details-wrapper">
            <div className="title">
                <h1>Account Details</h1>    
            </div>
            <CustomerDashboardDetailsForm getCustomer={customer}/>
        </div>
    )
}