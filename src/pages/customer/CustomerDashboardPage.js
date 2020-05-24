import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import CustomerDashboardGreeting from "../../components/customer/CustomerDashboardGreeting";
import CustomerDashboardCard from "../../components/customer/CustomerDashboardCard";
import CustomerDashboardFilterCards from "../../components/customer/CustomerDashboardFilterCards";
import { useDispatch, useSelector } from "react-redux";

export default function CustomerDashboardPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.order.items);

  return (
    <div className="customer-dashboard-wrapper">
      <div className="title">
        <h1>Dashboard</h1>
        {items &&
          items.map((item, i) => (
            <CustomerDashboardFilterCards key={i} item={item} />
          ))}
      </div>

      {items.length === 0 && <CustomerDashboardGreeting />}

      {items &&
        items.map((item, i) => <CustomerDashboardCard key={i} item={item} />)}
    </div>
  );
}
