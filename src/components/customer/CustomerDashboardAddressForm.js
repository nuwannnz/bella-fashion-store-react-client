import React, { useEffect, useState } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle } from "react-icons/fa";
import OverlayPopup from "../common/OverlayPopup";
import { useSelector, useDispatch } from "react-redux";
import { addAddressAsync, updateCustomerAddressAsync } from "../../redux/actions/customer/customer.actions";
import ErrorMessage from "../common/ErrorMessage";

export default function CustomerDashboardAddressForm( {closeFormClickHandler, addressToUpdate} ) {

    const customers = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        fName: addressToUpdate ? addressToUpdate.fName : "",
        lName: addressToUpdate ? addressToUpdate.lName : "",
        phone: addressToUpdate ? addressToUpdate.phone : "",
        country: "Sri Lanka",
        street: addressToUpdate ? addressToUpdate.street : "",
        town: addressToUpdate ? addressToUpdate.town : "",
        zip: addressToUpdate ? addressToUpdate.zip : ""
    });

        const [fName, setFname] = useState(addressToUpdate ? addressToUpdate.fName : "");
        const [lName, setLname] = useState(addressToUpdate ? addressToUpdate.lName : "");
        const [phone, setPhone] = useState(addressToUpdate ? addressToUpdate.phone : "");
        const [country, setCountry] = useState("Sri Lanka");
        const [street, setStreet] = useState(addressToUpdate ? addressToUpdate.street : "");
        const [town, setTown] = useState(addressToUpdate ? addressToUpdate.town : "");
        const [zip, setZip] = useState(addressToUpdate ? addressToUpdate.zip : "");

    // useEffect(() => {
    //     if(customers.closePopups) {
    //         closeFormClickHandler();
    //     }
    // }, [customers]);
    
    const handleFNameChanged = (e) => {
        address.fName = e.target.value;
        setAddress(address);
        setFname(e.target.value);
    };

    const handleLNameChanged = (e) => {
        address.lName = e.target.value;
        setAddress(address);
        setLname(e.target.value);
    };

    const handlePhoneChanged = (e) => {
        address.phone = e.target.value;
        setAddress(address);
        setPhone(e.target.value);
    };

    const handleCountryChanged = (e) => {
        address.country = e.target.value;
        setAddress(address);
        setCountry(e.target.value);
    };

    const handleStreetChanged = (e) => {
        address.street = e.target.value;
        setAddress(address);
        setStreet(e.target.value);
    };

    const handleTownChanged = (e) => {
        address.town = e.target.value;
        setAddress(address);
        setTown(e.target.value);
    };

    const handleZipChanged = (e) => {
        address.zip = e.target.value;
        setAddress(address);
        setZip(e.target.value);
    };

    const handleFormSubmit = () => {
        if(addressToUpdate){

            dispatch(updateCustomerAddressAsync(addressToUpdate._id, address));
        }else{

            dispatch(addAddressAsync(address));
        }
    };

    return (
        <div className="customer-address-dashboard-form-wrapper">
            <div className="customer-address-dashboard-form">
                <OverlayPopup
                    title={
                        addressToUpdate ? "Update Address" : "Add new Address"
                    }
                    onClosing={closeFormClickHandler}
                    onSubmit={handleFormSubmit}
                    primaryActionText={
                        addressToUpdate ? "Update Address" : "Add Address"
                    }
                    isSubmitting={customers.addingAddress}

                >
                    <input 
                        type="text" 
                        placeholder="First Name"
                        value={fName}
                        onInput={handleFNameChanged} 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name"
                        value={lName} 
                        onChange={handleLNameChanged}    
                    />
                    
                    <br />

                    <input 
                        type="text" 
                        placeholder="Phone" 
                        value={phone}
                        onChange={handlePhoneChanged}    
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Sri Lanka" 
                        value={country}
                        onChange={handleCountryChanged}
                        readOnly
                    />

                    <br />

                    <input
                        className="street-address" 
                        type="text" 
                        placeholder="Street Address"
                        value={street} 
                        onChange={handleStreetChanged}
                    />

                    <br />

                    <input 
                        type="text" 
                        placeholder="Town" 
                        value={town}
                        onChange={handleTownChanged}
                    />
                    <input 
                        type="text" 
                        placeholder="Postcode/Zip"
                        value={zip} 
                        onChange={handleZipChanged}
                    />

                    {customers.addAddressError && <ErrorMessage msg={customers.addAddressError} />}                    

                </OverlayPopup>
            </div>
        </div>
    );
}