import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { calculateSumPoids, ajuster } from "../utils/Markowitz/helpers";
import { useDispatch } from "react-redux";
import { updatePortefeuilles } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";
import { setPtfToBacktest } from "../redux/slices/BacktestSlice";
import { PlusSquare, Lock, Save, Trash, Zap, Unlock } from "react-feather";
import ModalComponent from "./Modal";
import DeleteModal from "./DeleteModal";
import { DeleteButton } from "./Ui/Buttons";

const EditPortefeuille = ({
  oldRows,
  newRows,
  setNewRows,
  field,
  children,
  openAddModal,
  rowsToDelete,
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
      console.log("rowsToDelete", rowsToDelete);
      const titres = rowsToDelete
        .filter((row) => !row.isLocked)
        .map((row) => row.titre);
      setNewRows((prevRows) =>
        prevRows.filter((item) => !titres.includes(item.titre))
      );
    }
    setIsOpen(false);
  };
  const handleLockUnlock = (choice) => {
    const titres = rowsToDelete.map((row) => row.titre);
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (titres.includes(item.titre)) {
          return { ...item, isLocked: choice };
        }
        return { ...item };
      })
    );
  };
  return (
    <>
      <Box className="flex flex-wrap flex-col content-end items-center gap-3 mb-2">
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
          <DeleteButton
            onClick={() => {
              console.log("rowsToDelete", rowsToDelete);
              setIsOpen(true);
            }}
            disabled={rowsToDelete.length < 1}
          />
          <Button
            size="small"
            className="flex gap-1 items-center"
            color="warning"
            variant="contained"
            onClick={() => handleLockUnlock(true)}
            disabled={rowsToDelete.length < 1}
          >
            verrouiller <Lock size={18} />
          </Button>
          <Button
            size="small"
            color="warning"
            className="flex gap-1 items-center"
            variant="contained"
            onClick={() => handleLockUnlock(false)}
            disabled={rowsToDelete.length < 1}
          >
            déverrouiller <Unlock size={18} />
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
