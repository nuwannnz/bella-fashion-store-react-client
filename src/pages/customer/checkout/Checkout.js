import React, { useState } from 'react'
import "../../../styles/Checkout.css";
import { toggleDisplayCheckout, toggleCartBar } from '../../../redux/actions/ui.actions';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutAddress, AddressItem } from './CheckoutAddress';
import { CheckoutPayment } from './CheckoutPayment';
import { CartItem } from "../FloatingCart";
import AccentButton from '../../../components/common/AccentButton';
import { placeOrderAsync } from '../../../redux/actions/customer/order.actions';




const ConfirmCheckoutStage = ({ selectedAddress, payment, items, confirmClickHandler }) => {
    const dispatch = useDispatch();
    const getTotalPrice = () => {
        if (!items) { return 0 }
        let total = 0;
        items.map(item => total += item.product.price * item.qty)
        return total;
    }
    return (
        <div className="checkout-stage-container checkout-confirm">

            <div className="items-wrap">
                <h6>Items</h6>
                <div className="item-list">
                    {items && items.map(item => <CartItem {...item} />)}
                </div>
            </div>

            <div className="info-wrap">
                <div >

                    <div className="address-item">
                        <h6>Delivery address</h6>
                        <AddressItem addressItem={selectedAddress} />
                    </div>
                    <div className="payment-item" >
                        <h6>Payment</h6>
                        <div className="method-info" >
                            <span className="method-name">{payment.paymentType === '1' ? 'Cash on delivery' : 'Credit/Debit card'}</span>
                            {
                                payment.cardInfo && <div>
                                    <span>{payment.cardInfo.cardNumber}</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex price-wrapper">
                        <span className="total-lable">Total:</span>
                        <span className="total-price">LKR {getTotalPrice()}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button className="continue-button" onClick={confirmClickHandler}>
                            Place order
                        </button>

                        <button className="continue-button secondary mt-2" onClick={() => dispatch(toggleDisplayCheckout(false))}>
                            Cancel order
                        </button>

                    </div>
                </div>

            </div>

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
    const addressList = useSelector(state => state.customer.customerInfo.addresses);
    const cartItems = useSelector((state) => state.cart.items);


    const [orderInfo, setOrderInfo] = useState({
        addressId: null,
        payment: {
            paymentType: -1,
            cardInfo: null
        },
        itemList: cartItems
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

    const handlePaymentMethodSelected = (paymentInfo) => {
        setOrderInfo({
            ...orderInfo,
            payment: {
                paymentType: paymentInfo.methodId,
                cardInfo: paymentInfo.methodId === '2' ? paymentInfo.cardInfo : null
            }
        })
        handleContinueClick();
    }

    const handleConfirmClick = () => {
        dispatch(placeOrderAsync(orderInfo)).then(success => {
            if (success) {
                dispatch(toggleDisplayCheckout(false));
            } else {

            }
        })
    }

    return (
        <div className="checkout-overlay">
            <div className="floating-overlay">

            </div>

            <div className="checkout-wrapper">
                <div className="checkout-header">
                    <h4>Checkout your order</h4>
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

                    {activeStepCount === 2 && <CheckoutPayment paymentMethodSelected={handlePaymentMethodSelected} backClickHandler={handleBackClick} />}

                    {activeStepCount === 3 && <ConfirmCheckoutStage
                        selectedAddress={addressList.find(a => a._id === orderInfo.addressId)}
                        payment={orderInfo.payment}
                        items={cartItems}
                        confirmClickHandler={handleConfirmClick}
                    />}
                </div>

            </div>
        </div>
    )
}
