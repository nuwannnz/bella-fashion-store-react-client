import React from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import { FaHourglassHalf, FaRegCheckCircle } from "react-icons/fa";

export default function CustomerDashboardFilterCards() {
    return (
        <div className="dashboard-filter-cards">
            <div className="filer-card-wrap">
                <div className="pending-card">
                    <div className="pending">
                        <span>
                            <FaHourglassHalf color="#fffff" size="1.5em"/>
                        </span>
                        <p>Pending:</p>
                        <h5>4</h5>
                    </div>
                </div>

                <div className="completed-card">
                    {/* <div className="completed-icon"></div> */}
                    <div className="completed">
                        <span>
                            <FaRegCheckCircle color="#fffff" size="1.5em"/>
                        </span>
                        <p>Completed:</p>
                        <h5>5</h5>
                    </div>
                </div>
            </div>
          
          
        </div>
    )
}