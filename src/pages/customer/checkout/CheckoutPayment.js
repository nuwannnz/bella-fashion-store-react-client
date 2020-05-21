import React, { useState } from 'react';
import { isEmpty, isLengthOf } from '../../../helpers/input-validation.helper';
import ErrorMessage from '../../../components/common/ErrorMessage';
import TextBox from '../../../components/common/TextBox';
import SelectBox from '../../../components/common/SelectBox';
import AccentButton from '../../../components/common/AccentButton';

const paymentMethods = [
    { id: 1, name: 'Cash on delivery', icon: 'fas fa-money-bill-wave' },
    { id: 2, name: 'Credit/Debit card', icon: 'far fa-credit-card' },
]

export const CheckoutPayment = ({ paymentMethodSelected, backClickHandler }) => {

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [displayCardError, setDisplayCardError] = useState(false)
    const [cardInfo, setCardInfo] = useState({
        holderName: '',
        cardNumber: '',
        expireMonth: '',
        expireYear: '',
        cvt: ''
    })

    const isCardInformationValid = () => {
        if (isEmpty(cardInfo.holderName)) {
            return false;
        }
        if (isEmpty(cardInfo.cardNumber) || !isLengthOf(cardInfo.cardNumber, 16)) {
            return false
        }
        if (isEmpty(cardInfo.expireMonth)) {
            return false;
        }
        if (isEmpty(cardInfo.expireYear)) {
            return false
        }
        if (isEmpty(cardInfo.cvt)) {
            return false
        }
        return true;
    }
    return (
        <div className="checkout-stage-container checkout-payment">
            <div>
                <h5>Select a payment method</h5>
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

            {paymentMethod && paymentMethod === '2' &&
                <div className="card-information-wrapper ">
                    <h6>Card information</h6>
                    {displayCardError && <ErrorMessage msg="Please complete your card details before going to next step" />}
                    <div>
                        <TextBox label="Card holder name"
                            placeholder="Card holder name"
                            onTextChange={(holderName) => setCardInfo({ ...cardInfo, holderName })}
                        />
                        <TextBox label="Card number"
                            placeholder="Card number"
                            onTextChange={(cardNumber) => setCardInfo({ ...cardInfo, cardNumber })}

                        />
                    </div>
                    <div className="d-flex ">
                        <div className="card-expire-wrapper d-flex">


                            <SelectBox
                                optionValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                displayDefault={false}
                                onItemSelected={(expireMonth) => { setCardInfo({ ...cardInfo, expireMonth }) }}
                                title="Month" />

                            <SelectBox
                                optionValues={[21, 22, 23, 24, 25, 26, 27, 28, 29]}
                                onItemSelected={(expireYear) => { setCardInfo({ ...cardInfo, expireYear }) }}
                                displayDefault={false}
                                title="Year" />


                        </div>

                        <div className="card-cvt-wrapper">
                            <TextBox
                                label="cvt"
                                onTextChange={(cvt) => setCardInfo({ ...cardInfo, cvt })}
                                placeholder="cvt" />
                        </div>
                    </div>
                </div>
            }
            <div className="coupon-code-wrapper d-flex">
                <div className="coupon-code-text-wrapper mr-1">

                    <TextBox
                        label="Coupon code"
                        placeholder="Enter coupon code here"
                    />

                </div>
                <div className="apply-btn-wrapper form-element-wrapper">
                    <AccentButton text={'Apply coupon code'} />
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
                    onClick={() => {
                        if (paymentMethod === '2' && !isCardInformationValid()) {
                            setDisplayCardError(true);
                            return;
                        }
                        if (paymentMethodSelected) {

                            paymentMethodSelected({ methodId: paymentMethod, cardInfo })
                        }
                    }
                    }>
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