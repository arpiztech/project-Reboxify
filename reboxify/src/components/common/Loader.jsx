import React from "react";
import "./Loader.css";

const Loader = ({
  size = "medium",
  color = "primary",
  text = "",
  fullScreen = false,
}) => {
  const LoaderElement = (
    <div
      className={`loader-container ${fullScreen ? "loader-fullscreen" : ""}`}
    >
      <div className={`loader loader-${size} loader-${color}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  return LoaderElement;
};

export default Loader;
