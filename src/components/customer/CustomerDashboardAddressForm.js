import React, { useEffect, useState } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle } from "react-icons/fa";
import OverlayPopup from "../common/OverlayPopup";
import { useSelector, useDispatch } from "react-redux";
import { addAddressAsync } from "../../redux/actions/customer/customer.actions";

export default function CustomerDashboardAddressForm( {closeFormClickHandler} ) {

    const customers = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        fName: "",
        lName: "",
        phone: "",
        country: "",
        street: "",
        town: "",
        zip: ""
    });

    useEffect(() => {
        if(customers.closePopups) {
            closeFormClickHandler();
        }
    }, [customers]);
    
    const handleFNameChanged = (e) => {
        address.fName = e.target.value;
        setAddress(address);
    };

    const handleLNameChanged = (e) => {
        address.lName = e.target.value;
        setAddress(address);
    };

    const handlePhoneChanged = (e) => {
        address.phone = e.target.value;
        setAddress(address);
    };

    const handleCountryChanged = (e) => {
        address.country = e.target.value;
        setAddress(address);
    };

    const handleStreetChanged = (e) => {
        address.street = e.target.value;
        setAddress(address);
    };

    const handleTownChanged = (e) => {
        address.town = e.target.value;
        setAddress(address);
    };

    const handleZipChanged = (e) => {
        address.zip = e.target.value;
        setAddress(address);
    };

    const handleFormSubmit = () => {
        dispatch(addAddressAsync(address));
    };

    return (
        <div className="customer-address-dashboard-form-wrapper">
            <div className="customer-address-dashboard-form">
                <OverlayPopup
                    title="Add new Address"
                    onClosing={closeFormClickHandler}
                    onSubmit={handleFormSubmit}
                    primaryActionText="Add address"
                    isSubmitting={customers.addingAddress}

                >
                    <input 
                        type="text" 
                        placeholder="First Name"
                        onChange={handleFNameChanged} 
                    />
                    <input 
                        type="text" 
                        placeholder="Phone" 
                        onChange={handlePhoneChanged}    
                    />
                    <input 
                        type="text" 
                        placeholder="Street Address" 
                        onChange={handleStreetChanged}
                    />
                </OverlayPopup>
                
                
            </div>
           
        </div>
    );
}