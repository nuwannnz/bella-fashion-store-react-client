import React from "react";
import "../../styles/customer/CustomerDashboardDetailsPage.css";
import CustomerDashboardDetailsForm from "../../components/customer/CustomerDashboardDetailsForm";

export default function CustomerDashboardDetailsPage() {
    return (
        <div className="customer-dashboard-details-wrapper">
            <div className="title">
                <h1>Account Details</h1>    
            </div>
            <CustomerDashboardDetailsForm />
        </div>
    )
}