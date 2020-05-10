import React from "react";
import "../styles/Header.css";
import { getAssetUrl } from "../helpers/assets.helper";

export const Header = () => {
  const styles = {
    header: {
      padding: "10px 10px 0px 10px",
    },
    logo: {
      width: "80px",
      height: "80px",
    },
    logoImg: {
      width: "100%",
      //   height: "100%",
    },
  };
  return (
    <div className="header-wrap flex" style={styles.header}>
      <div className="logo" style={styles.logo}>
        <img
          style={styles.logoImg}
          src={getAssetUrl("/logo/logo-text-accent.png")}
          alt="logo"
        />
      </div>
    </div>
  );
};
