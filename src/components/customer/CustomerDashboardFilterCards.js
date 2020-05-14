import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
// import { FaHourglassHalf, FaRegCheckCircle } from "react-icons/fa";

export default function CustomerDashboardFilterCards() {
    return (
        <div className="dashboard-filter-cards">
            <div className="filer-card-wrap">
                <div className="pending-card">
                    {/* <div className="pending-icon"><FaHourglassHalf color="#fffff" size="2em"/></div> */}
                    <div className="pending">
                        <h1>4</h1>
                        <p>Pending</p>
                    </div>
                </div>

                <div className="completed-card">
                    {/* <div className="completed-icon"><FaRegCheckCircle color="#fffff" size="2em"/></div> */}
                    <div className="completed">
                        <h1>5</h1>
                        <p>Completed</p>
                    </div>
                </div>
            </div>
          
          
        </div>
    )
}