import React, { useState } from 'react'
import "../../styles/Checkout.css";
import { toggleDisplayCheckout } from '../../redux/actions/ui.actions';
import { useDispatch } from 'react-redux';



const CheckoutFooter = ({ onClickContinue }) => {
    return (
        <div className="checkout-footer">
            <button className="continue-button" onClick={onClickContinue}>
                <span>

                    Continue
                </span>
                <span>
                    <i class="fas fa-angle-double-right"></i>
                </span>
            </button>
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

    const [activeStepCount, setActiveStepCount] = useState(1)

    const handleCloseBtnClick = () => {
        dispatch(toggleDisplayCheckout());
    }

    const handleContinueClick = () => {
        if (activeStepCount < 3) {
            setActiveStepCount(activeStepCount + 1);
        }
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

                </div>

                <div className="checkout-footer-wrapper">
                    <CheckoutFooter onClickContinue={handleContinueClick} />
                </div>
            </div>
        </div>
    )
}
