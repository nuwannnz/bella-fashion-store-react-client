import React from "react";
import "../../styles/common/AccentButton.css";

export default function AccentButton({
  onButtonClick = null,
  isLoading = false,
  text = "Button",
  isSecondary = false,
}) {
  return (
    <button
      className={`bella-accent-btn ${isSecondary && "secondary"}`}
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

      <span>{text}</span>
    </button>
  );
}
