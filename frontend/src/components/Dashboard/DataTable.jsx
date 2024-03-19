import React, { memo } from "react";
import Table from "../Table";

const DataTable = ({
  title,
  columns,
  rows,
  pagination = false,
  autoHeight = false,
  my = true,
}) => {
  return (
    <div className={`${my ? "my-5" : ""}`}>
      {title && <h3>{title}</h3>}
      <Table
        columns={columns}
        rows={rows}
        pagination={pagination}
        autoHeight={autoHeight}
      />
    </div>
  );
};

export default memo(DataTable);
