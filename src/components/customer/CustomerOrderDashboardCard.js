import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";

export default function CustomerOrderDashboardCard() {
    
    return (
        <div className="customer-order-dashboard-card-wrapper">
            <div className="order-card-wrapper">
                <div className="img">
                </div>
                <div className="order-details">
                        <p>Order No: 1000013250</p>
                        <p>Date: 2020.03.25</p>
                        <p>Status: Pending</p>
                        <p>Order Items: 3</p>
                        <p>Address: 131/A, Madapola, Teldeniya.</p>
                </div>
                <div className="total-price">
                    <h1>$150</h1>
                </div>

                <div className="order-card-btn">
                    <button>Review</button>
                    <button>Inquiry</button>
                </div>

                <div className="horizontal-line-wrapper">
                    <div className="horizontal-line">
                        <hr className="line1" />
                            <div className="horizontal-details">
                                <p className="item-name">Black Dress</p>
                                <p className="item-quantity">X1</p>
                                <p className="item-price">$50</p>
                            </div>
                        <hr className="line2" />
                    </div>
                </div>
                
            </div>
              
        </div>
    );
}


