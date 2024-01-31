import React, { useState, useEffect } from "react";
import Table from "../Table";

const columns = [
  {
    field: "Date",
    headerName: "Date",
    flex: 0.6,
    width: 360,
  },
  {
    field: "Sens",
    headerName: "Sens",
    flex: 0.6,
    width: 360,
  },
  {
    field: "INSTRUMENT",
    headerName: "Titre",
    flex: 0.6,
    width: 360,
  },
  {
    field: "Quantité",
    headerName: "Quantité",
    flex: 0.6,
    width: 360,
    renderCell: (params) => {
      const value = params.row.Quantité;
      return <strong>{value === "" ? "-" : value}</strong>;
    },
  },
  {
    field: "Poids",
    headerName: "Poids",
    flex: 0.6,
    width: 360,
    renderCell: (params) => {
      const value = params.row.Poids;
      return <strong>{value === "" ? "-" : value}</strong>;
    },
  },
];

const BacktestOperations = ({ operations }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("operations", operations);
  const rows = [
    {
      Date: "03/01/2024",
      Sens: "Achat",
      INSTRUMENT: "AFRIQUIA GAZ",
      Quantité: "",
      Poids: 130,
    },
  ];
  useEffect(() => {
    console.log("selcted", selectedRows);
    console.log("operations", operations);
  }, [selectedRows]);
  return (
    <>
      <Table
        rows={operations}
        columns={columns}
        withCheckboxes
        pageSize={10}
        setSelectedRows={setSelectedRows}
      />
    </>
  );
};

export default BacktestOperations;
