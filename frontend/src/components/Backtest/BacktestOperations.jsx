import React, { useState, useEffect } from "react";
import Table from "../Table";
import { Box, Button } from "@mui/material";
import { Trash } from "react-feather";
import ModalComponent from "../Modal/index";
import DeleteModal from "../Modal/DeleteModal";

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

const BacktestOperations = ({ operations, setOperations }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
  const handleDelete = (confirmation) => {
    console.log("rows to delete", selectedRows);
    if (confirmation) {
      const ids = selectedRows.map((row) => row._id);
      setOperations((prevRows) =>
        prevRows.filter((item) => !ids.includes(item._id))
      );
    }
    setIsOpen(false);
  };
  return (
    <Box className="my-4">
      <Button
        size="small"
        color="error"
        className="flex gap-1 items-center"
        variant="contained"
        onClick={() => setIsOpen(true)}
        disabled={selectedRows.length < 1}
      >
        Supprimer <Trash size={18} />
      </Button>
      <Table
        rows={operations}
        columns={columns}
        withCheckboxes
        pageSize={10}
        setSelectedRows={setSelectedRows}
      />
      <ModalComponent open={isOpen} handleClose={() => setIsOpen(false)}>
        <DeleteModal handleDeleteConfirmation={handleDelete} />
      </ModalComponent>
    </Box>
  );
};

export default BacktestOperations;
