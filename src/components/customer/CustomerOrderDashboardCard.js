import React, { useState, useEffect } from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../constants";
import moment from 'moment';

export default function CustomerOrderDashboardCard({ item, numOfItems }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useDispatch();
    const address = useSelector((state) => state.customer.customerInfo.addresses);

    const customerAddress = address.find((addr) =>
        addr._id === item.addressId
    );

    const itemName = item.items.map((i) => i.product?.name);
    console.log(itemName);



    const toggleDisplayInquiryForm = () => {
        // dispatch(openPopup(POPUP_KEYS.INQUIRY_POPUP));
        dispatch(openPopup(POPUP_KEYS.CUSTOMER_INQUIRY_POPUP));
    }

    const date = moment(item.createdAt).format("YYYY.MM.DD");

    const status = item.isCompleted ? "Completed" : "Pending";

    const handleImageIndexChange = (newIndex) => {
        setCurrentIndex(newIndex)
    }

    return (
        <div className="customer-order-dashboard-card-wrapper">
            <div className="order-card-wrapper">
                <div className="img">
                    <OrderItemImages imageList={item.items.map(i => i.product?.images[0])} onIndexChange={handleImageIndexChange} />
                </div>
                <div className="order-details">
                    <p>Order No: {item._id}</p>
                    <p>Date: {date}</p>
                    <p>Status: {status}</p>
                    <p>Order Items: {numOfItems}</p>
                    <p>Address: {`${customerAddress?.street}, ${customerAddress?.town}`}</p>
                </div>
                <div className="total-price">
                    <h1>LKR {item.totalValue}</h1>
                </div>

                <div className="order-card-btn">
                    <button>Review</button>
                    <button onClick={toggleDisplayInquiryForm}>Inquiry</button>
                </div>

                <div className="horizontal-line-wrapper">
                    <div className="horizontal-line">
                        <hr className="line1" />
                        <div className="horizontal-details">
                            <p className="item-name">{item.items[currentIndex]?.product?.name}</p>
                            <p className="item-quantity">X{item.items[currentIndex]?.qty}</p>
                            <p className="item-price">{item.items[currentIndex]?.product?.price}</p>
                        </div>
                        <hr className="line2" />
                    </div>
                </div>

            </div>

        </div>
    );

}


function OrderItemImages({ imageList, onIndexChange }) {

    const styles = {
        imgWrapper: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        },
        image: {
            width: '100%',
        },
        btn: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
        },
        btnNext: {
            right: '10px'
        },
        btnPrevious: {
            left: '10px'
        }

    }

    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNextClick = () => {
        if (currentIndex + 1 === imageList.length) {
            // end of the list
            // do nothing
            return;
        }
        setCurrentIndex(currentIndex + 1);
    }

    const handlePrevClick = () => {
        if (currentIndex === 0) {
            // start of the list
            // do nothing
            return
        }
        setCurrentIndex(currentIndex - 1);
    }

    useEffect(() => {
        onIndexChange(currentIndex);
    }, [currentIndex])

    return (
        <div className="img-wrapper" style={styles.imgWrapper}>
            <img src={imageList[currentIndex]} alt="Product images" style={styles.image} />
            <button
                className="next-btn btn btn-light btn-sm"
                style={{ ...styles.btn, ...styles.btnNext }}
                onClick={handleNextClick}
                disabled={currentIndex + 1 === imageList.length}>
                <i className="fas fa-chevron-right"></i>
            </button>
            <button
                className="previous-btn btn btn-light btn-sm"
                style={{ ...styles.btn, ...styles.btnPrevious }}
                onClick={handlePrevClick}
                disabled={currentIndex === 0}>
                <i className="fas fa-chevron-left"></i>
            </button>
        </div>
    )
}


