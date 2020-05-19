import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import CustomerDashboardAddress from "../../components/customer/CustomerDashboardAddress";
import CustomerDashboardAddressForm from "../../components/customer/CustomerDashboardAddressForm";
import CustomerDashboardAddresses from "../../components/customer/CustomerDashboardAddresses";
import { useDispatch, useSelector } from "react-redux";


export default function CustomerDashboardAddressPage() {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer);
    const addresses = useSelector((state) => state.customer.customerInfo.addresses);
    
    const [displayAddressForm, setDisplayAddressForm] = useState(false);
    const [addressToUpdate, setAddressToUpdate] = useState(null);


    const toggleDisplayAddressForm = () => {
        setAddressToUpdate(null);
        setDisplayAddressForm(!displayAddressForm);
    }

    

    const handleUpdateClick = (address) => {
        toggleDisplayAddressForm();
        setAddressToUpdate(address);
    }

    return (
        <div className="customer-address-dashboard-wrapper">
            <div className="title">
                <h1>Addresses</h1>
                {
                    addresses.length > 0 && (
                        <div className="add-address-btn">
                            <button onClick={toggleDisplayAddressForm}>Add Address</button>
                        </div>
                    )
                }
               
            </div>

            {addresses.length === 0 &&  <CustomerDashboardAddress closeFormClickHandler={toggleDisplayAddressForm} />}
            
           
            {displayAddressForm && <CustomerDashboardAddressForm closeFormClickHandler={toggleDisplayAddressForm}  addressToUpdate={addressToUpdate}/>}
            
            {addresses.length > 0 && <CustomerDashboardAddresses customerAddresses={addresses} handleUpdateClick={handleUpdateClick} /> }

            
        </div>
    );
}