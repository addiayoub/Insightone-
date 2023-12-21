import {
  Autocomplete,
  Checkbox,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const SelectAll = () => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [indices, setIndices] = useState([
    "MASI",
    "MASI RENTABILITE BRUT",
    "MASI RENTABILITE NET",
    "AGROALIMENTAIRE & PRODUCTION",
    "ASSURANCES",
    "BANQUES",
    "BATIMENT & MATERIAUX DE CONSTRUCTION",
    "BOISSONS",
  ]);

  // Add "Select All" option
  const allOption = "Sélectionner tout";
  const allSelected = selectedIndices.length === indices.length;

  const handleIndicesChange = (event, value) => {
    // If "Select All" is selected, set all indices
    console.log("value", value, allSelected);
    if (value.find((option) => option === "Select All")) {
      console.log("true");
      return setSelectedIndices(allSelected ? [] : indices);
    }
    return setSelectedIndices(value);
    // if (value.includes(allOption)) {
    //   // If "Select All" is selected, set all indices excluding "Select All"
    //   setSelectedIndices(indices);
    // } else {
    //   setSelectedIndices(value);
    // }
  };
  useEffect(() => {
    console.log(selectedIndices);
  }, [selectedIndices]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-indices"
      options={indices}
      disableCloseOnSelect
      value={selectedIndices}
      filterOptions={(options, params) => {
        // <<<--- inject the Select All option
        const filter = createFilterOptions();
        const filtered = filter(options, params);
        return ["Select All", ...filtered];
      }}
      onChange={handleIndicesChange}
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon} // Replace with your checked checkbox icon
            style={{ marginRight: 8 }}
            // checked={selected}
            checked={
              option === allOption
                ? !!(selectedIndices.length === indices.length)
                : selected
            }
          />
          {option}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Indices" placeholder="Indices" />
      )}
    />
  );
};

export default SelectAll;
