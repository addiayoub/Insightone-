import React from "react";
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
}) => {
  return (
    <>
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
      <Box className="flex gap-2 items-center">
        <TextField
          size="small"
          label="Nom de portefeuille"
          value={ptfName}
          onChange={(e) => setPtfName(e.target.value)}
        />
        <SingleSelect
          label="Type"
          options={["Actions", "OPCVM"]}
          value={ptfType}
          setValue={setPtfType}
        />
      </Box>
      <Box className="flex gap-2">
        <Button variant="contained" onClick={upload} disabled={isDisabled}>
          Upload
        </Button>
      </Box>
    </>
  );
};

export default PtfForm;
