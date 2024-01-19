import { Button, Box } from "@mui/material";
import React, { useState } from "react";
import { calculateSumPoids, ajuster } from "../utils/Markowitz/helpers";
import { useDispatch } from "react-redux";
import { updatePortefeuilles } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";
import { setPtfToBacktest } from "../redux/slices/BacktestSlice";
import { PlusSquare, Save, Trash, Zap } from "react-feather";
import ModalComponent from "./Modal";
import DeleteModal from "./DeleteModal";

const EditPortefeuille = ({
  oldRows,
  newRows,
  setNewRows,
  field,
  children,
  openAddModal,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleSave = () => {
    dispatch(updatePortefeuilles({ ptfs: newRows }))
      .unwrap()
      .then(({ message, portefeuille }) => {
        dispatch(setPtfToBacktest(portefeuille));
        notyf.success(message);
      })
      .catch(() => notyf.error("Error Update"));
  };
  const newR = {
    SECTEUR_ACTIVITE: "BANQUES",
    TICKER: "AJT",
    S_CATEGORIE: "AJt",
    titre: "Test Ajout",
    PTF_Min_Var: 28.401737798603687,
    isLocked: false,
  };
  console.log("oldRows", oldRows);
  const handleClear = (confirmation) => {
    if (confirmation) {
      setNewRows([]);
    }
    setIsOpen(false);
  };
  return (
    <>
      <Box className="flex flex-wrap flex-col content-end items-center gap-3">
        <h4>
          La somme: {calculateSumPoids(newRows, field)}/
          {calculateSumPoids(oldRows, field)}
        </h4>
        <Box className="flex flex-wrap gap-1 items-center">
          <Button
            variant="contained"
            size="small"
            onClick={openAddModal}
            className="flex gap-1 items-center bg-sky-500 hover:bg-sky-700"
          >
            Ajouter un titre <PlusSquare size={18} />
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => ajuster(newRows, setNewRows, field)}
            className="flex gap-1 items-center"
          >
            Ajuster <Zap size={18} />
          </Button>
          <Button
            size="small"
            color="error"
            className="flex gap-1 items-center"
            variant="contained"
            onClick={() => {
              console.log("newRows", newRows);
              setIsOpen(true);
            }}
            disabled={newRows.length < 1}
          >
            Vider <Trash size={18} />
          </Button>
          {/* <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => ajuster(newRows, setNewRows, field)}
          className="flex gap-1 items-center"
        >
          Enregistrer modifications <Save size={18} />
        </Button> */}
          {/* <Button
          variant="contained"
          onClick={() => {
            console.log("Before ", oldRows, "After", newRows);
            handleSave();
          }}
          className="flex gap-1 items-center"
          disabled={
            calculateSumPoids(oldRows, field) !==
            calculateSumPoids(newRows, field)
          }
        >
          Enregistrer <Save size={18} />
        </Button> */}
          {children}
        </Box>
      </Box>
      <ModalComponent open={isOpen} handleClose={() => setIsOpen(false)}>
        <DeleteModal handleDeleteConfirmation={handleClear} />
      </ModalComponent>
    </>
  );
};

export default EditPortefeuille;
