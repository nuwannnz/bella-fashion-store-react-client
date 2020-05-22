import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccentButton from '../../../components/common/AccentButton';
import { openPopup } from '../../../redux/actions/popup.actions';
import { POPUP_KEYS } from '../../../constants';

export const AddressItem = ({ index = -1, addressItem }) => {
    return (
        <label htmlFor={`address-${index}`}>
            <div className="address-info">
                <span className="address-name">{`${addressItem.fName} ${addressItem.lName}`} </span>
                <span className="address-phone"> {addressItem.phone} </span>
                <span className="address-street"> {`${addressItem.street}, ${addressItem.town}`} </span>
                <span className="address-street"> {`${addressItem.country}`} </span>

            </div>
        </label>
    )
}

export const CheckoutAddress = ({ addressSelectedHandler, selectedAddress }) => {
    const dispatch = useDispatch();
    const addressList = useSelector(state => state.customer.customerInfo.addresses);
    const [address, setAddress] = useState(selectedAddress ? selectedAddress : null)
    return (
        <div className="checkout-stage-container checkout-address">
            <div>

                <h5 >Select an address to deliver</h5>
                <div className="address-list">
                    {
                        addressList && addressList.map((addressItem, i) => (
                            <div key={i} className='address-item'>

                                <input id={`address-${i}`} type="radio"
                                    defaultChecked={addressItem._id === address}
                                    name="address"
                                    value={addressItem._id}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <AddressItem index={i} addressItem={addressItem} />
                            </div>
                        ))
                    }
                </div>

            </div>

            <div style={{ width: '160px' }}>

                <AccentButton
                    isSecondary={true}
                    text="Add new address"
                    onButtonClick={() => dispatch(openPopup(POPUP_KEYS.ADDRESS_POPUP))}
                />
            </div>
            {address !== null && <button
                className={`continue-button`} disabled={address === null}
                onClick={() => addressSelectedHandler(address)}>
                <span>

                    Continue
                </span>
                <span>
                    <i class="fas fa-angle-double-right"></i>
                </span>
            </button>}
        </div>

    )
}