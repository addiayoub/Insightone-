import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function FilterIndices() {
  const [choice, setChoice] = useState("All");

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="filter-indices-label">Filter</InputLabel>
        <Select
          labelId="filter-indices-select-label"
          id="filter-indices-select"
          value={choice}
          label="CLASSE"
          onChange={handleChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Action"}>Actions</MenuItem>
          <MenuItem value={"Thirty"}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
