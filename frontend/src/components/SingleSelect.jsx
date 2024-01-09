import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleSelect({ value, setValue, options, label }) {
  return (
    <Autocomplete
      disablePortal
      id={`combo-box-${label}`}
      options={options}
      noOptionsText={"Aucune option"}
      value={value}
      onChange={(event, value) => setValue(value)}
      size="small"
      sx={{ width: 250 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
