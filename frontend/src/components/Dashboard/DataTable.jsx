import React, { memo } from "react";
import Table from "../Table";

const DataTable = ({
  title,
  columns,
  rows,
  pagination = false,
  autoHeight = false,
  my = true,
  density,
}) => {
  return (
    <div className={`${my ? "my-5" : ""}`}>
      {title && <h3>{title}</h3>}
      <Table {...{ columns, rows, pagination, autoHeight, density }} />
    </div>
  );
};

export default memo(DataTable);
