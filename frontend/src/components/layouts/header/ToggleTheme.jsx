import React, { useState } from "react";
import "./ToggleTheme.css";
import ThemeIcon from "../../../icons/ThemeIcon";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../redux/slices/ThemeSlice";
function ToggleTheme() {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleChange = () => {
    setChecked(!isChecked);
    dispatch(toggleTheme());
  };
  return (
    <>
      <label className="theme-switch">
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
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
