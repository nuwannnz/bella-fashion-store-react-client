import React, { useEffect } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CustomerDashboardAddress( {closeFormClickHandler} ) {
    const customers = useSelector((state) => state.customer);

    useEffect(() => {
        if(customers.closePopups) {
            closeFormClickHandler();
        }
    }, [customers]);

    return (
        <div className="customer-address-dashboard">
            <div className="empty-address-card">
                <div className="msg">
                    <FaCheckCircle size="2em" color="#8C52FF"/>
                    <p>No address has been made yet.</p>
                </div>
                <div className="add-address-btn">
                    <button onClick={closeFormClickHandler}>Add Address</button>
                </div>
            </div>
        </div>
    );
}