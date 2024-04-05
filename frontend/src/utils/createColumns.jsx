import moment from "moment";
import { formatNumberWithSpaces } from "./formatNumberWithSpaces";

const defaultRenderCell = (row, col, index, isAlign) => {
  const {
    field,
    isDate,
    isNum,
    isPerce,
    isMill,
    cellWidth = "50%",
    cellAlign = "right",
  } = col;
  let value = row[field];
  const style = isAlign
    ? {
        minWidth: cellWidth,
      }
    : {};
  if (isDate) {
    value = moment(value).format("DD/MM/YYYY");
  } else if (isNum) {
    value = isPerce ? value * 100 : value;
    value = isMill ? value / 1e6 : value;
    value = parseFloat(value?.toFixed(2));
    value = formatNumberWithSpaces(value);
  }
  return index > 0 ? (
    <span className={`text-${cellAlign}`} style={style}>
      {value}
      {isPerce ? "%" : ""}
    </span>
  ) : (
    <strong>
      {value}
      {isPerce ? "%" : ""}
    </strong>
  );
};

export function createColumns(cols, isAlign = true) {
  return cols.map((col, index) => {
    const {
      headerAlign = "left",
      width = 200,
      field,
      headerName,
      renderCell = defaultRenderCell,
    } = col;
    const flex = col?.flex ? { flex: col?.flex } : {};

    const def = {
      field,
      headerName,
      headerAlign,
      width,
      ...flex,
      renderCell: ({ row }) => renderCell(row, col, index, isAlign),
    };
    return def;
  });
}
