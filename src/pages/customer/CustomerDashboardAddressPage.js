import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import CustomerDashboardAddress from "../../components/customer/CustomerDashboardAddress";
import CustomerDashboardAddressForm from "../../components/customer/CustomerDashboardAddressForm";
import CustomerDashboardAddresses from "../../components/customer/CustomerDashboardAddresses";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomerAddress } from "../../services/customer/customer.service";

export default function CustomerDashboardAddressPage() {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer);
    // const loggedInAddressId = useSelector((state) => state.customer.customerInfo.addresses.id);
    
    const [displayAddressForm, setDisplayAddressForm] = useState(false);
    const [addressToUpdate, setAddressToUpdate] = useState(null);


    const toggleDisplayAddressForm = () => {
        setAddressToUpdate(null);
        setDisplayAddressForm(!displayAddressForm);
    }

    const handleDeleteClick = (address) => {
        dispatch(deleteCustomerAddress(address._id));
    };

    const handleUpdateClick = (address) => {
        toggleDisplayAddressForm();
        setAddressToUpdate(address);
    }

    return (
        <div className="customer-address-dashboard-wrapper">
            <div className="title">
                <h1>Addresses</h1>
                <div className="add-address-btn">
                    <button onClick={toggleDisplayAddressForm}>Add Address</button>
                </div>
            </div>
            {/* <CustomerDashboardAddress /> */}
            {/* <CustomerDashboardAddressForm /> */}
            <CustomerDashboardAddresses />
        </div>
    );
}