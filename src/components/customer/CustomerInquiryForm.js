import React from "react";
import "../../styles/customer/CustomerInquiry.css";
import OverlayPopup from "../common/OverlayPopup";
import { useSelector } from "react-redux";

export default function CustomerInquiryForm({ closePopup }) {
    const [inquiry, setInquiry] = useSelector({
        name: "",
        email: "",
        phone: "",
        subject: "",
        description: ""
    });

    const handleNameChanged = (e) => {
        inquiry.name = e.target.value;
        setInquiry(inquiry);
    };

    const handleEmailChnaged = (e) => {
        inquiry.email = e.target.value;
        setInquiry(inquiry);
    };

    const handlePhoneChanged = (e) => {
        inquiry.phone = e.target.value;
        setInquiry(inquiry);
    };

    const handleSubjectChanged = (e) => {
        inquiry.subject = e.target.value;
        setInquiry(inquiry);
    };

    const handleDescriptionChanged = (e) => {
        inquiry.description = e.target.value;
        setInquiry(inquiry);
    };

    const handleFormSubmit = () => {

    };

    return(
        <OverlayPopup
            title="Your Inquiry"
            onClosing={closePopup}
            onSubmit={handleFormSubmit}
            primaryActionText="Submit"
            isSubmitting
        >
            <div className="customer-inquiry-form"> 
                <input 
                    type="text"
                    placeholder="Name"
                    onChange={handleNameChanged}
                />
                <br />

                <input 
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChnaged}
                />
                <br />

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
        
    )
}