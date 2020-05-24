import React, { useState, useEffect } from "react";
import "../../styles/customer/CustomerDashboardPage.css";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function CustomerDashboardCard({ item }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const date = moment(item.createdAt).format("YYYY.MM.DD");

  const status = item.isCompleted ? "Completed" : "Pending";

  const handleImageIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <div className="dashboard-order-card-wrapper">
        <div className="order-card">
          <div className="order-img">
            <OrderItemImages
              imageList={item.items.map((i) => i.product?.images[0])}
              onIndexChange={handleImageIndexChange}
            />
          </div>
          <div className="order-details">
            <p>Order No: {item._id}</p>
            <p>Date: {date}</p>
            <p>Status: {status}</p>
          </div>
          <div className="total-price">
            <h1>LKR {item.totalValue}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderItemImages({ imageList, onIndexChange }) {
  const styles = {
    imgWrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      borderRadius: "20px",
    },
    image: {
      width: "100%",
    },
    btn: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    btnNext: {
      right: "10px",
    },
    btnPrevious: {
      left: "10px",
    },
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex + 1 === imageList.length) {
      // end of the list
      // do nothing
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      // start of the list
      // do nothing
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    onIndexChange(currentIndex);
  }, [currentIndex]);

  return (
    <div className="img-wrapper" style={styles.imgWrapper}>
      <img
        src={imageList[currentIndex]}
        alt="Product images"
        style={styles.image}
      />
      <button
        className="next-btn btn btn-light btn-sm"
        style={{ ...styles.btn, ...styles.btnNext }}
        onClick={handleNextClick}
        disabled={currentIndex + 1 === imageList.length}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      <button
        className="previous-btn btn btn-light btn-sm"
        style={{ ...styles.btn, ...styles.btnPrevious }}
        onClick={handlePrevClick}
        disabled={currentIndex === 0}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
    </div>
  );
}
