import React, { useState } from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import { FaCheckCircle, FaPenSquare, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteAddressAsync } from "../../redux/actions/customer/customer.actions";

export default function CustomerDashboardAddresses( { customerAddresses, handleUpdateClick } ) {

    const dispatch = useDispatch();

    // useEffect(() => {
    //   console.log("Address");
    //   console.log(customer.addresses.reverse());
    // }, [])

    const handleDeleteClick = (addressId) => {
        dispatch(deleteAddressAsync(addressId));
    }

    return (
        <div className="customer-address-dashboard">

        {
          customerAddresses &&  customerAddresses.reverse().map((address) => (
                <div className="address-card">
                <div className="icon-wrap">
                    <FaCheckCircle size="1.5em" color="#8C52FF"/>
                </div>
                <div className="address-details-wrap">
                    <p>{`${address.fName } ${address.lName}`}</p>
                    <p>{`${address.street}`}</p>
                    
                    <div className="icons-wrap">
                        <button onClick={() => handleUpdateClick(address)}><FaPenSquare size="1.5em" color="#8C52FF" /></button> 
                        <button onClick={() => handleDeleteClick(address._id)}><FaTrash size="1.5em" color="#8C52FF" /></button>
                    </div>
                </div>
            </div>
    ))
        }
        </div>
    );
}
