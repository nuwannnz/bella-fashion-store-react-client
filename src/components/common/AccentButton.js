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
      <span>{text}</span>
    </button>
  );
}
