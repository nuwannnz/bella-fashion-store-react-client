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
                            <FaHourglassHalf color="#fffff" size="1em"/>
                        </span>
                        <p>Pending:</p>
                        <h4>4</h4>
                    </div>
                </div>

                <div className="completed-card">
                    {/* <div className="completed-icon"></div> */}
                    <div className="completed">
                        <span>
                            <FaRegCheckCircle color="#fffff" size="1em"/>
                        </span>
                        <p>Completed:</p>
                        <h4>5</h4>
                    </div>
                </div>
            </div>
          
          
        </div>
    )
}