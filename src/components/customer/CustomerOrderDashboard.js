import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomerOrderDashboard() {
    
    return (
        <div className="customer-order-dashboard">
            <div className="empty-order-card">
                <div className="msg">
                    <FaCheckCircle size="2em" color="#8C52FF"/>
                    <p>No order has been made yet.</p>
                </div>
                <div className="shop-btn">
                    <button>Go to the shop</button>
                </div>
            </div>  
        </div>
    );
}


