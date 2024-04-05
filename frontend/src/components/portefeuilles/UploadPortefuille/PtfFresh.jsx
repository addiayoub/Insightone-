import React, { useState } from "react";
import PtfForm from "./PtfForm";
import { Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPtfName as setPtfToSave } from "../../../redux/slices/PtfSlice";

const PtfFresh = ({ handleFreshPtf, ptfsType }) => {
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState(ptfsType[0]);
  const dispatch = useDispatch();
  const create = () => {
    dispatch(setPtfToSave(ptfName));
    handleFreshPtf(ptfName, ptfType);
  };
  const isDisabled = !ptfName || !ptfType;
  return (
    <>
      <PtfForm
        {...{
          ptfType,
          ptfName,
          setPtfName,
          setPtfType,
          ptfsType,
        }}
        isFresh
      />
      <Box className="flex gap-2 mt-3">
        <Button variant="contained" onClick={create} disabled={isDisabled}>
          Créer
        </Button>
      </Box>
    </>
  );
};

export default PtfFresh;
