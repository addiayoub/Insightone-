import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckSquare, Trash } from "react-feather";
import SingleSelect from "../../SingleSelect";
import { Box, Button } from "@mui/material";
import { deletePortefeuilles } from "../../../redux/actions/UserActions";
import { setPortefeuilles } from "../../../redux/slices/UserSlice";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../../../redux/slices/BacktestSlice";
import { notyf } from "../../../utils/notyf";
import ModalComponent from "../../Modal";
import DeleteModal from "../../DeleteModal";

const types = ["Actions", "OPCVM"];

const SavedPtfs = ({ selectedPtfs, setSelectedPtfs, show, setShow }) => {
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  const [type, setType] = useState("Actions");
  const [ptf, setPtf] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPtfs.length < 1) {
      setShow(false);
    }
  }, [selectedPtfs]);
  useEffect(() => {
    setShow(false);
    console.log("ptf", ptf);
    if (ptf) {
      const choosen = data.find((item) => item.name === ptf);
      setSelectedPtfs([choosen]);
    } else {
      setSelectedPtfs([]);
    }
  }, [ptf]);

  const handleValider = (choosenPtf) => {
    setShow(true);
    console.log("selected ptfs", selectedPtfs);
    const choosen = data.find((item) => item.name === ptf);
    console.log("choosen", choosen);
    console.log("data", data);
    console.log("choosenPtf", choosenPtf);
    setSelectedPtfs([choosen]);
    dispatch(setPtfToBacktest(choosen));
    dispatch(setSelectedPtf(ptf));
  };

  const handleDelete = (confirmation) => {
    if (confirmation) {
      dispatch(deletePortefeuilles({ ptfs: selectedPtfs }))
        .unwrap()
        .then(({ message, portefeuilles }) => {
          setPtf(null);
          dispatch(setPortefeuilles(portefeuilles));
          notyf.success(message);
          setSelectedPtfs([]);
        })
        .catch(() => notyf.error("Error Delete"));
    }
    setIsOpen(false);
    console.log("selected ptfs", selectedPtfs);
  };
  useEffect(() => {
    setPtf(null);
  }, [type]);
  const portefeuilles = data
    .filter((ptf) => ptf.type === type)
    .map((ptf) => ptf.name);

  return (
    <>
      <Box className="flex flex-wrap gap-3 items-center">
        <SingleSelect
          label={"Type"}
          options={types}
          value={type}
          setValue={setType}
        />
        <SingleSelect
          label={"Portefeuilles"}
          options={portefeuilles}
          value={ptf}
          setValue={setPtf}
        />
        <Button
          variant="contained"
          className="min-w-[115px] flex gap-2 items-center"
          color="primary"
          size="small"
          id="valider-btn"
          onClick={handleValider}
          disabled={!ptf}
        >
          Valider <CheckSquare size={18} />
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          className="min-w-[115px] flex gap-2 items-center"
          onClick={() => setIsOpen(true)}
          disabled={!ptf}
        >
          Supprimer <Trash size={18} />
        </Button>
      </Box>
      <ModalComponent open={isOpen} handleClose={() => setIsOpen(false)}>
        <DeleteModal handleDeleteConfirmation={handleDelete} />
      </ModalComponent>
    </>
  );
};

export default memo(SavedPtfs);
