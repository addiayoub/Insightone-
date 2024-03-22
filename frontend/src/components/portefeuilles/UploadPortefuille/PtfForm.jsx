import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SingleSelect from "../../SingleSelect";

const PtfForm = ({
  noHeaders,
  setNoHeaders,
  ptfName,
  setPtfName,
  ptfType,
  setPtfType,
  upload,
  isDisabled,
  isFresh,
  ptfsType,
}) => {
  useEffect(() => {
    console.log("No hedaers is", noHeaders, isFresh);
  }, [noHeaders]);
  return (
    <>
      {!isFresh && (
        <FormControlLabel
          className="w-fit"
          control={
            <Checkbox
              value={noHeaders}
              onChange={(event) => setNoHeaders(event.target.checked)}
            />
          }
          label="Le fichier ne contient pas d'en-têtes"
        />
      )}
      <Box className="flex gap-2 items-center">
        <TextField
          size="small"
          label="Nom de portefeuille"
          value={ptfName}
          onChange={(e) => setPtfName(e.target.value)}
        />
        <SingleSelect
          label="Type"
          options={ptfsType}
          value={ptfType}
          setValue={setPtfType}
        />
      </Box>
      {!isFresh && (
        <Box className="flex gap-2">
          <Button
            variant="contained"
            type="submit"
            onClick={upload}
            disabled={isDisabled}
          >
            Upload
          </Button>
        </Box>
      )}
    </>
  );
};

export default PtfForm;
