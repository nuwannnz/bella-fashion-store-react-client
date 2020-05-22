import React from "react";
import "../../styles/customer/CustomerInquiry.css";
import OverlayPopup from "../common/OverlayPopup";

export default function CustomerInquiryForm({ closePopup }) {
    return(
        <OverlayPopup
            title="Your Inquiry"
            onClosing={closePopup}
            onSubmit
            primaryActionText="Submit"
            isSubmitting
        >
            <div className="customer-inquiry-form"> 
                <input 
                    type="text"
                    placeholder="Name"
                />
                <br />

                <input 
                    type="email"
                    placeholder="Email"
                />
                <br />

                <input 
                    type="number"
                    placeholder="Phone"
                />
                <br />

                <input 
                    type="text"
                    placeholder="Subject"
                />
                <br />

                <textarea 
                    type="text"
                    placeholder="Description"
                />

                
            </div>
        </OverlayPopup>
        
    )
}