import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import { getAssetUrl } from "../../helpers/assets.helper";
import { useSelector } from "react-redux";

export default function CustomerDashboardGreeting() {

    const customer = useSelector((state) => state.customer.customerInfo);

    return (
        <div className="customer-dashboard-greeing">
                <div className="greeting-to-customer">
                    <p>Hello {customer && customer.fName}!</p>
                </div>

                <div className="customer-dashboard-msg">
                    <p>
                    From your account dashboard you can view your recent orders, 
                    manage your shipping and billing addresses, 
                    and edit your password and account details.
                    </p>
                </div>

                <div className="dashboard-cover-img">
                    <img src={getAssetUrl("customerDashboard/dashboard.jpg")} alt="Dashboard Cover" />
                </div>
        </div>
    );
}