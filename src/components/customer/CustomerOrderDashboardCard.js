import React from "react";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../constants";
import moment from 'moment';

export default function CustomerOrderDashboardCard({ item, numOfItems }) {
    const dispatch = useDispatch();
    const address = useSelector((state) => state.customer.customerInfo.addresses);

    const [order, setOrder] = useSelector({
        orderNo: item._id
    })

    const customerAddress = address.find((addr) => 
        addr._id === item.addressId
    );

    const itemName = item.items.map((i) => i.product.name);
    console.log(itemName);
    
    
    
    const toggleDisplayInquiryForm = () => {
        // dispatch(openPopup(POPUP_KEYS.INQUIRY_POPUP));
        dispatch(openPopup(POPUP_KEYS.CUSTOMER_INQUIRY_POPUP));
    }

    const date = moment(item.createdAt).format("YYYY.MM.DD");

    const status = item.isCompleted ? "Completed" : "Pending";
    
    return (
        <div className="customer-order-dashboard-card-wrapper">
            <div className="order-card-wrapper">
                <div className="img">
                </div>
                <div className="order-details">
                        <p>Order No: {order.orderNo}</p>
                        <p>Date: {date}</p>
                        <p>Status: {status}</p>
                        <p>Order Items: {numOfItems}</p>
                        <p>Address: {`${customerAddress.street}, ${customerAddress.town}`}</p>
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
                                <p className="item-name">Black Dress</p>
                                <p className="item-quantity">X1</p>
                                <p className="item-price">$50</p>
                            </div>
                        <hr className="line2" />
                    </div>
                </div>
                
            </div>
              
        </div>
    );
   
}




