import React from "react";
import "./PtfRange.css";
import { ChevronDown } from "react-feather";

function PtfRange({ ptfs, selected }) {
  return (
    <div className="flex items-center gap-x-3 mt-8 gap-y-6  flex-wrap">
      <span className="font-bold">Prudent</span>
      <div className="ptfs-container">
        {ptfs.map(({ ptf }, index) => {
          console.log("ptf", ptf);
          return (
            <div
              key={index}
              className={`ptf ${ptf === selected ? "active" : ""}`}
            >
              {ptf === selected && <ChevronDown className="arrow" size={30} />}
              <span>{index + 1}</span>
            </div>
          );
        })}
      </div>
      <span className="font-bold">Risqué</span>
    </div>
  );
}

export default PtfRange;
