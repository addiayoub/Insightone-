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

function SelectIndices({
  label,
  indices,
  selectedIndices,
  setSelectedIndices,
  disableCloseOnSelect = true,
  blurOnSelect = false,
  width = 250,
  show = true,
}) {
  indices = [...new Set(indices)];
  const allOption = "Sélectionner tout";
  const allSelected = selectedIndices.length === indices.length;
  const handleIndicesChange = (event, value) => {
    if (value.find((option) => option === allOption)) {
      setSelectedIndices(allSelected ? [] : indices);
      return;
    }
    setSelectedIndices(value);
  };
  if (show) {
    return (
      <Autocomplete
        multiple
        id={`id-${label}-${Math.random() * 100}`}
        options={indices}
        disableCloseOnSelect={disableCloseOnSelect}
        blurOnSelect={blurOnSelect}
        value={selectedIndices}
        filterOptions={(options, params) => {
          const filter = createFilterOptions();
          const filtered = filter(options, params);
          return filtered.length > 0 ? [allOption, ...filtered] : [];
        }}
        onChange={handleIndicesChange}
        noOptionsText={"aucune option"}
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
        limitTags={4}
        sx={{ width }}
        menuprops={MenuProps}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={label}
            size="small"
          />
        )}
      />
    );
  }
  return null;
}

export default SelectIndices;
