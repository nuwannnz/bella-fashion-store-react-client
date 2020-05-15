import React from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle, FaPenSquare, FaTrash } from "react-icons/fa";

export default function CustomerDashboardAddresses() {
    
    return (
        <div className="customer-address-dashboard">
            <div className="address-card">
                <div className="icon-wrap">
                    <FaCheckCircle size="1.5em" color="#8C52FF"/>
                </div>
                <div className="address-details-wrap">
                    <p>Anjana Kumari</p>
                    <p>131/A, Madapola, Theldeniya</p>
                    <div className="icons-wrap">
                        <span><FaPenSquare size="1.5em" color="#8C52FF" /></span> 
                        <span><FaTrash size="1.5em" color="#8C52FF" /></span>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}