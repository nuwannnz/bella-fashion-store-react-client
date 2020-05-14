import React from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomerDashboardAddressForm() {
    
    return (
        <div className="customer-address-dashboard-form-wrapper">
            <div className="customer-address-dashboard-form">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Phone" />
                <input type="text" placeholder="Street Address" />
                
            </div>
           
        </div>
    );
}