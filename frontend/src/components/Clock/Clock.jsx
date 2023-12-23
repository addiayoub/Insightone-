import React, { useEffect, useState } from "react";
import "./Clock.css";
import { IconButton } from "@mui/material";
import { ChevronsLeft, ChevronsRight } from "react-feather";

const Clock = () => {
  const deg = 6;
  const [hourRotation, setHourRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  const [secondRotation, setSecondRotation] = useState(0);
  const [isHide, setIsHide] = useState(true);
  const updateClock = () => {
    const day = new Date();
    const hh = day.getHours() * 30;
    const mm = day.getMinutes() * deg;
    const ss = day.getSeconds() * deg;

    setHourRotation(hh + mm / 12);
    setMinuteRotation(mm);
    setSecondRotation(ss);
  };

  useEffect(() => {
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`clock-main-container ${isHide ? "is-hide" : ""}`}>
      <IconButton onClick={() => setIsHide(!isHide)} className="toggle-button">
        {isHide ? <ChevronsLeft /> : <ChevronsRight />}
      </IconButton>
      <div className={`clock-container`}>
        <div className="clock">
          <div
            className="hour"
            style={{ transform: `rotateZ(${hourRotation}deg)` }}
          ></div>
          <div
            className="min"
            style={{ transform: `rotateZ(${minuteRotation}deg)` }}
          ></div>
          <div
            className="sec"
            style={{ transform: `rotateZ(${secondRotation}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
