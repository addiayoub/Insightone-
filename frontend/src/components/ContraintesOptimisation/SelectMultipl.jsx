import { Box, FormControl, Select } from "@mui/material";
import React from "react";
import selectStyle from "../../utils/SelectMultiple";

function SelectMultipl({ setSelectedTitres, handleChangeMultiple, titres }) {
  console.log("contrainte opti titres", titres);
  return (
    <Box>
      <FormControl
        sx={{ m: 1, minWidth: 120, maxWidth: 300, marginRight: "20px" }}
      >
        <Select
          multiple
          native
          value={setSelectedTitres}
          onChange={handleChangeMultiple}
          label=""
          sx={selectStyle}
        >
          {titres.map((valeur) => (
            <option key={valeur} value={valeur}>
              {valeur}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectMultipl;
