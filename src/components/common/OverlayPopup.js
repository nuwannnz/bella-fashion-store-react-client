import React from "react";
import AccentButton from "./AccentButton";

const styles = {
  wrapper: {
    position: "absolute",

    backgroundColor: "#fff",
    minWidth: "300px",
    borderRadius: "8px",
    padding: "20px",
    top: "0px",
    bottom: "0px",
    right: "0px",
    boxShadow: "-7px 1px 16px 6px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  wrapperFromCenter: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: {
    marginTop: "0px",
    marginBottom: "20px",
  },
  overlayPanel: {
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
    backgroundColor: "rgba(99, 82, 82, 0.13)",
  },

  actionWrapper: {
    display: "flex",
  },
  action: {},
};

export default function OverlayPopup({
  children,
  primaryActionText = "submit",
  secondaryActionText = "cancel",
  title = "Dialog",
  onClosing = null,
  onSubmit = null,
}) {
  return (
    <div className="overlay-panel" style={styles.overlayPanel}>
      <div className="overlay-popup " style={styles.wrapper}>
        <div className="header">
          <h2 style={styles.title}>{title}</h2>
          <span></span>
        </div>
        <div className="form-wrapper">{children}</div>

        <div className="action-wrapper" style={styles.actionWrapper}>
          <div style={{ marginRight: "5px" }}>
            <AccentButton text={secondaryActionText} isSecondary={true} />
          </div>
          <div>
            <AccentButton text={primaryActionText} />
          </div>
        </div>
      </div>
    </div>
  );
}
