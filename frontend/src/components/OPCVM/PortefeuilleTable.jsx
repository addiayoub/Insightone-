import React, { useMemo, useState } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { Edit, Lock, Unlock } from "react-feather";
import { IconButton } from "@mui/material";
import ModalComponent from "../Modal";

const updatePoids = (setState, titreToUpdate, newData, setOpen) => {
  setOpen(true);
  setState((prevData) => {
    return prevData.map((item) => {
      if (item.titre === titreToUpdate) {
        console.log(item, "true");
        return { ...item, ...newData };
      }
      console.log(item);
      return item;
    });
  });
  console.log("Down");
};

const PortefeuilleTable = ({ rows, field, showActions }) => {
  const [newRows, setNewRows] = useState(rows);
  const [open, setOpen] = useState(false);
  const columns = useMemo(() => {
    return [
      {
        field: "Societe_Gestion",
        headerName: "Société de Gestion",
        flex: 0.7,
        renderCell: (params) => <strong>{params.row.Societe_Gestion}</strong>,
      },
      {
        field: "Classification",
        headerName: "Classification",
        flex: 0.5,
        renderCell: (params) => <strong>{params.row.Classification}</strong>,
      },
      {
        field: "titre",
        headerName: "Titre",
        flex: 0.7,
        renderCell: (params) => <strong>{params.row.titre}</strong>,
      },
      {
        field: field,
        headerName: "Poids (%)",
        flex: 0.3,
        renderCell: (params) => {
          const val = params.row?.[field]?.toFixed(2);
          return (
            <span className="font-semibold">{formatNumberWithSpaces(val)}</span>
          );
        },
      },
      showActions
        ? {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
              <>
                <IconButton
                  onClick={() => {
                    console.log("Params", params);
                    console.log("Ne rows", newRows);
                    console.log(
                      "filter rows",
                      newRows.filter((row) => row.titre === params.row.titre)
                    );
                    // updatePoids(
                    //   setNewRows,
                    //   params.row.titre,
                    //   { [field]: 2 },
                    //   setOpen
                    // );
                    // setNewRows({
                    //   ...newRows,
                    // });
                  }}
                >
                  <Edit size={18} color="var(--primary-color)" />
                </IconButton>
                <IconButton onClick={() => console.log("Params", params)}>
                  <Unlock size={18} color="var(--text-success)" />
                </IconButton>
              </>
            ),
          }
        : {},
    ];
  }, [field, showActions]);
  return (
    <>
      <Table columns={columns} rows={newRows} pageSize={25} />
      {/* <ModalComponent open={open}>
        <h1>Edit Poids</h1>
      </ModalComponent> */}
    </>
  );
};

export default PortefeuilleTable;
