import React, { useState } from "react";
import OverlayPopup from "../common/OverlayPopup";
import "../../styles/InquiryDashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import { replyToInquiryAsync } from "../../redux/actions/inquiry.actions";

export default function ReplyCustomerInquiryForm({ closePopup, inquiryItem }) {
  const dispatch = useDispatch();

  const [inquiry, setInquiry] = useState({
    inquiryId: inquiryItem._id,
    subject: inquiryItem.subject,
    description: "",
  });

  const handleDescriptionChanged = (e) => {
    inquiry.description = e.target.value;
    setInquiry(inquiry);
  };

  const handleFormSubmit = () => {
    dispatch(replyToInquiryAsync(inquiry)).then((success) => {
      if (success) {
        closePopup();
      }
    });
  };

  return (
    <OverlayPopup
      title="Your Inquiry"
      onClosing={closePopup}
      onSubmit={handleFormSubmit}
      primaryActionText="Submit"
      isSubmitting
    >
      <div className="inquiry-form">
        <input type="text" placeholder="Subject" value={inquiry.subject} />

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
