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
    >
      {isLoading && <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
      <span>{text}</span>
    </button>
  );
}
