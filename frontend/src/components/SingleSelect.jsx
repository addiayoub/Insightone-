import React from "react";
import { TextField, Autocomplete } from "@mui/material";

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SingleSelect({
  value,
  setValue,
  options,
  label,
  suffix = "",
}) {
  return (
    <Autocomplete
      disablePortal
      id={`combo-box-${label}`}
      options={options}
      noOptionsText={"Aucune option"}
      value={value}
      onChange={(event, value) => setValue(value)}
      size="small"
      getOptionLabel={(option) => option + suffix}
      sx={{ width: 250 }}
      // MenuProps={MenuProps}
      menuprops={MenuProps}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
