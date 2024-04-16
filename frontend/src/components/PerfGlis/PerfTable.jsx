import React from "react";
import Table from "../Table";
import { getColumns } from "./columns";

const PerfTable = ({ data, title, isFirst, density = "compact" }) => {
  return (
    <Table
      rows={data}
      columns={getColumns(data, isFirst)}
      pageSize={10}
      density={density}
      legend={title}
    />
  );
};

export default PerfTable;
