import React from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomerDashboardAddress() {
    
    return (
        <div className="customer-address-dashboard">
            <div className="empty-address-card">
                <div className="msg">
                    <FaCheckCircle size="2em" color="#8C52FF"/>
                    <p>No address has been made yet.</p>
                </div>
                <div className="add-address-btn">
                    <button>Add Address</button>
                </div>
            </div>
        </div>
    );
}