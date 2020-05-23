import React from "react";
import "../../styles/customer/CustomerDashboardAddressPage.css";
import CustomerDashboardAddress from "../../components/customer/CustomerDashboardAddress";
import CustomerDashboardAddresses from "../../components/customer/CustomerDashboardAddresses";
import { useSelector, useDispatch } from "react-redux";
import { openPopup } from "../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../constants";


export default function CustomerDashboardAddressPage() {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.customer.customerInfo.addresses);



    const toggleDisplayAddressForm = () => {
       dispatch(openPopup(POPUP_KEYS.ADDRESS_POPUP));
    };

    const handleUpdateClick = (address) => {
        dispatch(openPopup(POPUP_KEYS.ADDRESS_POPUP, { addressToUpdate: address }));
    };

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
            
                    
            {addresses.length > 0 && <CustomerDashboardAddresses customerAddresses={addresses} handleUpdateClick={handleUpdateClick} /> }

            
        </div>
    );
}