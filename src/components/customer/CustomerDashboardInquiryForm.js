import React from "react";
import OverlayPopup from "../common/OverlayPopup";
import "../../styles/customer/CustomerOrderDashboardPage.css";

export default function CustomerDashboardInquiryForm({ closePopup }) {
    return(
        <OverlayPopup
            title="Your Inquiry"
            onClosing={closePopup}
            onSubmit
            primaryActionText="Submit"
            isSubmitting
        >
        
        <div className="inquiry-form">
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