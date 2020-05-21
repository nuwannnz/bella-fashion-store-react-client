import React from "react";
import "../../styles/customer/CustomerDashboardDetailsPage.css";
import { FaUserEdit, FaUserLock } from "react-icons/fa";

export default function CustomerDashboardDetailsForm() {
    return(
        <div className="customer-dashboard-details">
            <div className="details-form">
                <div className="user-edit">
                    <FaUserEdit size="2em" color="#8c52ff"/>
                </div>
                <div>
                    <input type="text" placeholder="First Name" />
                </div>
                <div>
                    <input type="text" placeholder="Last Name" />            
                </div>
                <div>
                    <input type="text" placeholder="Email" />
                </div>

                <div className="save-btn">
                    <button>Save</button>
                </div>
            </div>

            <div className="details-form">
                <div className="user-pwd">
                    <FaUserLock size="2em" color="#8c52ff"/>
                </div>
                <div>
                    <input type="text" placeholder="Current Password" />
                </div>
                <div>
                    <input type="text" placeholder="New Password" />            
                </div>
                <div>
                    <input type="text" placeholder="Confirm New Password" />
                </div>

                <div className="reset-btn">
                    <button>Reset Your Password</button>
                </div>
            </div>
           
        </div>
    )
}