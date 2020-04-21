import React from "react";
import { getAssetUrl } from "../../helpers/assets.helper";
import "../../styles/LoadingAnimation.css";

export default function LoadingAnimation() {
  return (
    <div className="loading-anim-wrap flex-center flex-c">
      <img
        className="rotate-center"
        src={getAssetUrl("logo/logo.png")}
        alt="Loading..."
      />
    </div>
  );
}
