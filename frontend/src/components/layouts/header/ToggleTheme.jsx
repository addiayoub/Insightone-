import React from "react";
import "./ToggleTheme.css";
import ThemeIcon from "../../../icons/ThemeIcon";
function ToggleTheme() {
  return (
    <>
      <label className="theme-switch">
        <input type="checkbox" className="theme-switch__checkbox" />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds"></div>
          <div className="theme-switch__stars-container">
            <ThemeIcon />
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </>
  );
}

export default ToggleTheme;
