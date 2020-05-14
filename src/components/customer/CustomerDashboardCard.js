import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import "../../styles/customer/CustomerDashboardPage.css";

const Dot = ({ index, onClickHandler }) => {
    return (
      <div className="dot" onClick={() => onClickHandler(index)}>
        <FaRegCircle size="1em" />
      </div>
    );
};

// const OrderImageSlider = ({ imageLinks }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//     const handleDotClick = (index) => {
//       setCurrentImageIndex(index);
//     };
  
//     return (
//       <div className="image-slider-wrap">
//         {/* actual image */}
//         {/* <img src={imageLinks[currentImageIndex]} /> */}
  
//         {/* Dots per each image */}
  
//         {imageLinks.map((link, index, array) => (
//           <Dot key={index} index={index} onClickHandler={handleDotClick} />
//         ))}
//       </div>
//     );
//   };


export default function CustomerDashboardCard() {
    return (
        <div>
            <div className="dashboard-order-card-wrapper">
                <div className="order-card">
                    <div className="order-img">
                        <h4 style={{textAlign:"center"}}>Image</h4>
                        <div className="dot">
                            {/* <OrderImageSlider /> */}
                        </div>
                    </div>
                    <div className="order-details">
                        <h4>Order No: 1000013250</h4>
                        <h4>Date: 2020.03.25</h4>
                        <h4>Status: Pending</h4>
                    </div>
                    <div className="total-price">
                        <h1>$150</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}