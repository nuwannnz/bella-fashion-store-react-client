import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import CustomerDashboardGreeting from "../../components/customer/CustomerDashboardGreeting";
import CustomerDashboardCard from "../../components/customer/CustomerDashboardCard";
import CustomerDashboardFilterCards from "../../components/customer/CustomerDashboardFilterCards";

export default function CustomerDashboardPage() {
    
    return (
        <div className="customer-dashboard-wrapper">
                <div className="title">
                    <h1>Dashboard</h1>
                    <CustomerDashboardFilterCards />
                </div>
               {/* <CustomerDashboardGreeting /> */}
               
               <CustomerDashboardCard />
               <CustomerDashboardCard />
               <CustomerDashboardCard />
        </div>
    );
}