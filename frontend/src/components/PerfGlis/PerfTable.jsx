import React from "react";
import Table from "../Table";
import { getColumns } from "./columns";

const PerfTable = ({ data, title, isFirst, density = "compact" }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Table
        rows={data}
        columns={getColumns(data, isFirst)}
        pageSize={10}
        density={density}
      />
    </div>
  );
};

export default PerfTable;
