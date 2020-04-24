

import React from 'react'
import '../../styles/common/AccentButton.css';

export default function AccentButton({ onButtonClick = null, isLoading = false, text = "Button" }) {
    return (

        <button
            className="bella-accent-btn"
            onClick={() => {
                if (onButtonClick !== null) {
                    onButtonClick();
                }
            }}

            disabled={isLoading}
        >
            {/* {isLoading === true ?
                <span>

                    {text}
                </span>
                : (<div class="lds-ring"><div></div><div></div><div></div><div></div></div>)
            } */}

            <span>
                {text}
            </span>
        </button>
    )
}
