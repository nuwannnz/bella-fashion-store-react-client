import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardDetailsPage.css";
import { FaUserEdit, FaUserLock } from "react-icons/fa";
import { updateCustomerInfoAsync } from "../../redux/actions/customer/customer.actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";

export default function CustomerDashboardDetailsForm( {getCustomer} ) {

    const customers = useSelector((state) => state.customer);
    
    const dispatch = useDispatch();

    const [fName, setFname] = useState(getCustomer ? getCustomer.fName : "");
    const [lName, setLname] = useState(getCustomer ? getCustomer.lName : "");
    const [email, setEmail] = useState(getCustomer ? getCustomer.email : "");

    const [customer, setCustomer] = useState({
        fName: getCustomer? getCustomer.fName : "",
        lName: getCustomer ? getCustomer.lName : "",
        email: getCustomer ? getCustomer.email : ""
    });

    const handleFNameChanged = (e) => {
        customer.fName = e.target.value;
        setCustomer(customer);
        setFname(e.target.value);
    }

    const handleLNameChanged = (e) => {
        customer.lName = e.target.value;
        setCustomer(customer);
        setLname(e.target.value);
    }

    const handleEmailChanged = (e) => {
        customer.email = e.target.value;
        setCustomer(customer);
        setEmail(e.target.value);
    }

    const handleFormSubmit = () => {
        dispatch(updateCustomerInfoAsync(customer));
    }

    return(
        <div className="customer-dashboard-details">
            <div className="details-form">
                <div className="user-edit">
                    <FaUserEdit size="2em" color="#8c52ff"/>
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="First Name"
                        value={fName}
                        onChange={handleFNameChanged} />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Last Name"
                        value={lName}
                        onChange={handleLNameChanged} />            
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChanged} />
                </div>

                <div className="save-btn">
                    <button onClick={handleFormSubmit}>Save</button>
                </div>

                {customers.addCustomerInfoError && <ErrorMessage msg={customers.addCustomerInfoError} />}

            </div>

            <div className="details-form">
                <div className="user-pwd">
                    <FaUserLock size="2em" color="#8c52ff"/>
                </div>
                <div>
                    <input type="password" placeholder="Current Password" />
                </div>
                <div>
                    <input type="password" placeholder="New Password" />            
                </div>
                <div>
                    <input type="password" placeholder="Confirm New Password" />
                </div>

                <div className="reset-btn">
                    <button>Reset Your Password</button>
                </div>
            </div>
           
        </div>
    )
}