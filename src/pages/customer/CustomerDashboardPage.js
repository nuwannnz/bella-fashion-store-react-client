import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import CustomerDashboardGreeting from "../../components/customer/CustomerDashboardGreeting";
import CustomerDashboardCard from "../../components/customer/CustomerDashboardCard";

export default function CustomerDashboardPage() {
    
    return (
        <div className="customer-dashboard-wrapper">
                <div className="title">
                    <h1>Dashboard</h1>
                </div>
               {/* <CustomerDashboardGreeting /> */}
               <CustomerDashboardCard />
        </div>
    );
}