import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import CustomerOrderDashboardCard from "../../components/customer/CustomerOrderDashboardCard";
import CustomerOrderDashboard from "../../components/customer/CustomerOrderDashboard";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATHS } from "../../constants";

export default function CustomerOrderDashboardPage() {
  const items = useSelector((state) => state.order.items);

  return (
    <div className="customer-order-dashboard-wrapper">
      <div className="title">
        <h1>Orders</h1>
      </div>

      {items.length === 0 && <CustomerOrderDashboard />}

      {items &&
        items.map((item, i) => (
          <CustomerOrderDashboardCard key={i} item={item} />
        ))}
    </div>
  );
}
