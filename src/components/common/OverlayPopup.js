import React from "react";

import AccentButton from "./AccentButton";

const styles = {
  wrapper: {
    backgroundColor: "#fff",
    minWidth: "300px",
    borderRadius: "8px",
    boxShadow: "-7px 1px 16px 6px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: '90vh'
  },
  wrapperFromCenter: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  header: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: "0px",
  },
  closeBtn: {
    color: "#777",
    cursor: "pointer",
    padding: "5px",
  },
  formWrapper: {
    padding: "10px",
    maxHeight: '100%',
    overflow: 'auto'
  },

  overlayPanel: {
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
    backgroundColor: "rgba(99, 82, 82, 0.13)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999"
  },

  actionWrapper: {
    display: "flex",
    padding: "10px",
  },
  action: {},
};

export default function OverlayPopup({
  children,
  primaryActionText = "submit",
  secondaryActionText = "cancel",
  title = "Dialog",
  isSubmitting = false,
  onClosing = null,
  onSubmit = null,
  displayActions = true
}) {
  const closeClickHandler = () => {
    if (onClosing) {
      onClosing();
    }
  };

  const submitClickHandler = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="overlay-panel" style={styles.overlayPanel}>
      <div className="overlay-popup " style={styles.wrapper}>
        <div className="header" style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <span style={styles.closeBtn} onClick={closeClickHandler}>
            <i class="fas fa-times"></i>
          </span>
        </div>
        <div className="form-wrapper" style={styles.formWrapper}>
          {children}
        </div>

        {displayActions && <div className="action-wrapper" style={styles.actionWrapper}>
          <div style={{ marginRight: "5px" }}>
            <AccentButton
              text={secondaryActionText}
              isSecondary={true}
              onButtonClick={closeClickHandler}
            />
          </div>
          <div>
            <AccentButton
              text={primaryActionText}
              onButtonClick={submitClickHandler}
              isLoading={isSubmitting}
            />
          </div>
        </div>}
      </div>
    </div>
  );
}
