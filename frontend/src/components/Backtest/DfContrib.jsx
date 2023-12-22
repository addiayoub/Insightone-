import React from "react";
import AccordionBox from "../AccordionBox";
import Table from "../Table";

function isNumber(value) {
  return typeof value === "number";
}

function DfContrib({ title, data }) {
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key,
    width: 200,
    renderCell: (params) => {
      console.log(params.row[key]);
      return (
        <span style={{ fontWeight: "bold" }}>
          {isNumber(params.row[key])
            ? params.row[key].toFixed(2)
            : params.row[key]}
        </span>
      );
    },
  }));
  return (
    <AccordionBox title={title}>
      <Table columns={columns} rows={data} />
    </AccordionBox>
  );
}

export default DfContrib;
