import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import { FaCheckCircle } from "react-icons/fa";
import { ROUTE_PATHS } from "../../constants";
import { useHistory } from "react-router-dom";

export default function CustomerOrderDashboard() {
  const history = useHistory();

  const sendToMainPage = () => {
    history.push(ROUTE_PATHS.CUSTOMER_SHELL);
  };
  return (
    <div className="customer-order-dashboard">
      <div className="empty-order-card">
        <div className="msg">
          <FaCheckCircle size="2em" color="#8C52FF" />
          <p>No order has been made yet.</p>
        </div>
        <div className="shop-btn">
          <button onClick={sendToMainPage}>Go to the shop</button>
        </div>
      </div>
    </div>
  );
}
