import {
  Autocomplete,
  Checkbox,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React, { useState } from "react";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function SelectIndices({
  label,
  indices,
  selectedIndices,
  setSelectedIndices,
  disableCloseOnSelect = true,
}) {
  const allOption = "Sélectionner tout";
  const allSelected = selectedIndices.length === indices.length;
  const handleIndicesChange = (event, value) => {
    if (value.find((option) => option === allOption)) {
      return setSelectedIndices(allSelected ? [] : indices);
    }
    return setSelectedIndices(value);
  };
  return (
    <Autocomplete
      multiple
      id={`id-${label}-${Math.random() * 100}`}
      options={indices}
      disableCloseOnSelect={disableCloseOnSelect}
      value={selectedIndices}
      filterOptions={(options, params) => {
        const filter = createFilterOptions();
        const filtered = filter(options, params);
        return filtered.length > 0 ? [allOption, ...filtered] : [];
      }}
      onChange={handleIndicesChange}
      getOptionLabel={(option) => option}
      ListboxProps={{ style: { maxHeight: 300 } }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={
              option === allOption
                ? !!(selectedIndices.length === indices.length)
                : selected
            }
          />
          {option}
        </li>
      )}
      sx={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} size="small" />
      )}
    />
  );
}

export default SelectIndices;
