import React, { memo, useState } from "react";
import { ChevronDown } from "react-feather";
import "./GridSelection.css";

function GridSelection({ setRows, setCols, cols, rows }) {
  const [selectedRows, setSelectedRows] = useState(rows);
  const [selectedColumns, setSelectedColumns] = useState(cols);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleHover = (rows, columns) => {
    setHoveredRow(rows);
    setHoveredColumn(columns);
  };

  const handleClick = () => {
    setSelectedRows(hoveredRow || 1);
    setSelectedColumns(hoveredColumn || 1);
    setRows(hoveredRow || 1);
    setCols(hoveredColumn || 1);
  };

  return (
    <div className="grid-selection-wrapper">
      <div className="flex items-center gap-3">
        <span>Rangées x Colonnes:</span>
        <span className="seletion-btn flex items-center gap-3 text-m">
          {rows}x{cols}
          <ChevronDown size={20} />
        </span>
      </div>
      <table className="selection-table">
        <tbody>
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <tr key={rowIndex} className="row">
              {Array.from({ length: 20 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={`square ${
                    rowIndex < selectedRows && colIndex < selectedColumns
                      ? "selected"
                      : ""
                  } ${
                    rowIndex + 1 > hoveredRow || colIndex + 1 > hoveredColumn
                      ? "hovered"
                      : ""
                  }`}
                  onMouseEnter={() => handleHover(rowIndex + 1, colIndex + 1)}
                  onMouseLeave={() => handleHover(null, null)}
                  onClick={handleClick}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default memo(GridSelection);
