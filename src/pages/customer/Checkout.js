import React, { useState } from 'react'
import "../../styles/Checkout.css";
import { toggleDisplayCheckout } from '../../redux/actions/ui.actions';
import { useDispatch, useSelector } from 'react-redux';
import AccentButton from "../../components/common/AccentButton";
import { openPopup } from "../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../constants";

const paymentMethods = [
    { id: 1, name: 'Cash on delivery', icon: 'fas fa-money-bill-wave' },
    { id: 2, name: 'Credit/Debit card', icon: 'far fa-credit-card' },
]

const CheckoutPayment = ({ paymentMethodSelected, backClickHandler }) => {

    const [paymentMethod, setPaymentMethod] = useState(null);

    return (
        <div className="checkout-stage-container checkout-payment">
            <div>
                <h3>Select a payment method</h3>
                <div className="payment-method-list">
                    {
                        paymentMethods.map((method, i) => (
                            <div key={i} className='payment-item'>

                                <input id={`method-${i}`} type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor={`method-${i}`}>
                                    <div className="method-info">
                                        <span className="method-icon"><i className={method.icon}></i></span>
                                        <span className="method-name">{method.name} </span>
                                    </div>
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="d-flex">
                <button className="continue-button secondary mr-1"
                    onClick={backClickHandler}
                >
                    <span>
                        <i class="fas fa-angle-double-left"></i>
                    </span>
                    <span>
                        Back
                    </span>
                </button>
                {paymentMethod !== null && <button
                    className={`continue-button`} disabled={paymentMethod === null}
                    onClick={paymentMethodSelected}>
                    <span>

                        Continue
                </span>
                    <span>
                        <i class="fas fa-angle-double-right"></i>
                    </span>
                </button>}
            </div>
        </div>
    )
}

const CheckoutAddress = ({ addressSelectedHandler, selectedAddress }) => {
    const dispatch = useDispatch();
    const addressList = useSelector(state => state.customer.customerInfo.addresses);
    const [address, setAddress] = useState(selectedAddress ? selectedAddress : null)
    return (
        <div className="checkout-stage-container checkout-address">
            <div>

                <h3>Select an address to deliver</h3>
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
                                <label htmlFor={`address-${i}`}>
                                    <div className="address-info">
                                        <span className="address-name">{`${addressItem.fName} ${addressItem.lName}`} </span>
                                        <span className="address-phone"> {addressItem.phone} </span>
                                        <span className="address-street"> {`${addressItem.street}, ${addressItem.town}`} </span>
                                        <span className="address-street"> {`${addressItem.country}`} </span>

                                    </div>
                                </label>
                            </div>
                        ))
                    }
                    <AccentButton
                        text="Add new address"
                        onButtonClick={() => dispatch(openPopup(POPUP_KEYS.ADDRESS_POPUP))}
                    />
                </div>

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


const CheckoutStepCounter = ({ activeStep }) => {
    return (
        <div className="checkout-step-counter">
            <span className={`step-number ${activeStep >= 1 && 'active'}`}> <span className="step-label">Delivery</span></span>
            <span className={`step-bar ${activeStep >= 2 && 'active'}`}> </span>
            <span className={`step-number ${activeStep >= 2 && 'active'}`}> <span className="step-label">Payment</span></span>
            <span className={`step-bar ${activeStep >= 3 && 'active'}`}> </span>
            <span className={`step-number ${activeStep >= 3 && 'active'}`}> <span className="step-label">Confirmation</span></span>
        </div>
    )
}

export default function Checkout() {

    const dispatch = useDispatch();

    const [orderInfo, setOrderInfo] = useState({
        addressId: null
    })
    const [activeStepCount, setActiveStepCount] = useState(1)

    const handleCloseBtnClick = () => {
        dispatch(toggleDisplayCheckout());
    }

    const handleContinueClick = () => {
        if (activeStepCount < 3) {
            setActiveStepCount(activeStepCount + 1);
        }
    }

    const handleBackClick = () => {
        if (activeStepCount > 1) {
            setActiveStepCount(activeStepCount - 1);
        }
    }

    const handleAddressSelected = (addressId) => {
        const newOrderInfo = {};
        Object.assign(newOrderInfo, orderInfo);
        newOrderInfo.addressId = addressId;
        setOrderInfo(newOrderInfo);
        handleContinueClick();
    }

    return (
        <div className="checkout-overlay">
            <div className="floating-overlay">

            </div>

            <div className="checkout-wrapper">
                <div className="checkout-header">
                    <h2>Checkout your order</h2>
                    <div className="checkout-step-wrapper">
                        <CheckoutStepCounter activeStep={activeStepCount} />
                    </div>
                    <span className="close-btn" onClick={handleCloseBtnClick} ><i class="fas fa-times"></i></span>
                </div>

                <div className="checkout-content-wrapper">
                    {activeStepCount === 1 &&
                        <CheckoutAddress
                            addressSelectedHandler={handleAddressSelected}
                            selectedAddress={orderInfo.addressId}
                        />}

                    {activeStepCount === 2 && <CheckoutPayment backClickHandler={handleBackClick} />}

                </div>

            </div>
        </div>
    )
}
