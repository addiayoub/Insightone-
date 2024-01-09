import React from "react";
import { IconButton } from "@mui/material";
import { Edit, Lock, PieChart, Unlock } from "react-feather";
import { calculateSumClassification } from "../../../utils/OPCVM/helpers";
const Actions = ({
  params,
  setOpen,
  setPoids,
  setNewTitre,
  setOpenEdit,
  handleLock,
  rows,
  field,
}) => {
  return (
    <>
      <IconButton
        onClick={() => {
          const res = calculateSumClassification(
            rows,
            params.row.Classification,
            field
          );
          setOpen(true);
          setPoids(params.row[field].toFixed(2));
          setNewTitre(params.row.titre);
          console.log(res, "open");
        }}
      >
        <Edit size={18} color="var(--primary-color)" />
      </IconButton>
      <IconButton
        onClick={() => {
          setPoids(params.row[field].toFixed(2));
          setOpenEdit(true);
          setNewTitre(params.row.titre);
        }}
      >
        <PieChart size={18} color="var(--avwap-color)" />
      </IconButton>
      <IconButton
        onClick={() => handleLock(params.row.titre, params.row.isLocked)}
      >
        {params.row.isLocked ? (
          <Lock size={18} color="var(--text-warning)" />
        ) : (
          <Unlock size={18} color="var(--text-success)" />
        )}
      </IconButton>
    </>
  );
};

export default Actions;
