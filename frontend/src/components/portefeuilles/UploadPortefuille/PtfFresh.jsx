import React, { useState } from "react";
import PtfForm from "./PtfForm";
import { Button, Box } from "@mui/material";

const PtfFresh = ({ handleFreshPtf }) => {
  const [ptfName, setPtfName] = useState("");
  const [ptfType, setPtfType] = useState("Actions");
  const create = () => {
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
