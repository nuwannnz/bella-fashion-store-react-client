import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import CustomerOrderDashboardCard from "../../components/customer/CustomerOrderDashboardCard";
import { useDispatch, useSelector } from "react-redux";

export default function CustomerOrderDashboardPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.order.items);
    const address = useSelector((state) => state.customer.customerInfo.addresses);
    const numOfItems = items.length;
        
    return (
        <div className="customer-order-dashboard-wrapper">
            <div className="title">
                <h1>Orders</h1>
            </div>
            {/* <CustomerOrderDashboard /> */}

            {
                items && items.map((item, i) => <CustomerOrderDashboardCard key={i} item={item} numOfItems={numOfItems}/>)
            }
            
            
        </div>
    );
}