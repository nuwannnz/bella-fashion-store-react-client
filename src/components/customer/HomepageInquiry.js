import React from "react";
import OverlayPopup from "../common/OverlayPopup";
import "../../styles/customer/CustomerInquiry.css";

export default function HomepageInquiry({ closePopup }) {
    return(
        <OverlayPopup>
            <div className="inquiry-wrapper">
                <input 
                    type="text"
                    placeholder=""
                />
            </div>
        </OverlayPopup>
    )
}