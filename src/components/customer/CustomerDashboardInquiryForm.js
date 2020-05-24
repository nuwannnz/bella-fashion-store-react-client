import React, { useState } from "react";
import OverlayPopup from "../common/OverlayPopup";
import "../../styles/customer/CustomerOrderDashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addInquiryAsync } from "../../redux/actions/inquiry.actions";

export default function CustomerDashboardInquiryForm({ closePopup }) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false)

  const customer = useSelector((state) => state.customer.customerInfo);

  const [inquiry, setInquiry] = useState({
    name: customer.fName,
    email: customer.email,
    phone: "",
    subject: "",
    description: "",
  });

  const handleSubjectChanged = (e) => {
    inquiry.subject = e.target.value;
    setInquiry(inquiry);
  };

  const handleDescriptionChanged = (e) => {
    inquiry.description = e.target.value;
    setInquiry(inquiry);
  };

  const handlePhoneChanged = (e) => {
    inquiry.phone = e.target.value;
    setInquiry(inquiry);
  };

  const handleFormSubmit = () => {
    setSubmitting(true)
    dispatch(addInquiryAsync(inquiry)).then((success) => {
      if (success) {
        closePopup();
      }
      setSubmitting(false)
    });
  };

  return (
    <OverlayPopup
      title="Your Inquiry"
      onClosing={closePopup}
      onSubmit={handleFormSubmit}
      primaryActionText="Submit"
      isSubmitting={submitting}
    >
      <div className="inquiry-form">
        <input
          type="number"
          placeholder="Phone"
          onChange={handlePhoneChanged}
        />

        <br />

        <input
          type="text"
          placeholder="Subject"
          onChange={handleSubjectChanged}
        />

        <br />

        <textarea
          type="text"
          placeholder="Description"
          onChange={handleDescriptionChanged}
        />
      </div>
    </OverlayPopup>
  );
}
