import React from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import CustomerDashboardAddress from "../../components/customer/CustomerDashboardAddress";
import CustomerDashboardAddressForm from "../../components/customer/CustomerDashboardAddressForm";
import CustomerDashboardAddresses from "../../components/customer/CustomerDashboardAddresses";

export default function CustomerDashboardAddressPage() {
    
    return (
        <div className="customer-address-dashboard-wrapper">
            <div className="title">
                <h1>Addresses</h1>
            </div>
            {/* <CustomerDashboardAddress /> */}
            {/* <CustomerDashboardAddressForm /> */}
            <CustomerDashboardAddresses />
        </div>
    );
}