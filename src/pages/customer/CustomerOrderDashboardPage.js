import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import CustomerOrderDashboard from "../../components/customer/CustomerOrderDashboard";
import CustomerOrderDashboardCard from "../../components/customer/CustomerOrderDashboardCard";

export default function CustomerOrderDashboardPage() {
    
    return (
        <div className="customer-order-dashboard-wrapper">
            <div className="title">
                <h1>Orders</h1>
            </div>
            <CustomerOrderDashboard />
            {/* <CustomerOrderDashboardCard />
            <CustomerOrderDashboardCard />
            <CustomerOrderDashboardCard /> */}
        </div>
    );
}