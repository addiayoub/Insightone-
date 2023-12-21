import React from "react";
import "./loader.css";
function Loader({ width }) {
  const size = width ?? "3.25em";
  return (
    <svg viewBox="25 25 50 50" className="loader" style={{ width: size }}>
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
}

export const Loader2 = () => {
  return (
    <div className="loading">
      <svg width="100px" height="48px">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        ></polyline>
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        ></polyline>
      </svg>
    </div>
  );
};


export default Loader;
