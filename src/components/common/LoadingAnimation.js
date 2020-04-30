import React from "react";
import { getAssetUrl } from "../../helpers/assets.helper";
import "../../styles/LoadingAnimation.css";
import { useSelector } from "react-redux";

export default function LoadingAnimation() {

  const isLoading = useSelector(state => state.ui.isLoading);

  return (

    isLoading ?
      (<div className="loading-anim-wrap flex-center flex-c">
        <div>
          <img
            className="rotate-center"
            src={getAssetUrl("logo/logo-bg.png")}
            alt="Loading..."
          />

          <img
            className="logo-text"
            src={getAssetUrl("logo/logo-text.png")}
            alt="Loading..."
          />
        </div>

      </div>)
      : null

  );
}
