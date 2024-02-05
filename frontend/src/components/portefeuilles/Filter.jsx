import dayjs from "dayjs";
import React, { useState, useEffect, memo } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import SelectIndices from "../Markowitz/SelectIndices";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { SearchButton } from "../Ui/Buttons";

const Filter = () => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [ptf, setPtf] = useState(null);
  const {
    portefeuilles: { data },
  } = useSelector((state) => state.user);
  const [types, setTypes] = useState([]);
  const ptfs = data
    .filter(({ type }) => types.includes(type))
    .map((ptf) => ptf.name);
  useEffect(() => {
    setPtf(null);
  }, [types]);
  return (
    <AccordionBox
      isExpanded={true}
      detailsClass="flex flex-wrap gap-3 items-center"
    >
      <DateComponent
        date={dateDebut}
        setDate={setDateDebut}
        label={"Date Début"}
        detailsClass="flex flex-wrap gap-3 items-center"
      />
      <DateComponent date={dateFin} setDate={setDateFin} label={"Date Fin"} />
      <SelectIndices
        indices={["Titre", "OPCVM"]}
        selectedIndices={types}
        setSelectedIndices={setTypes}
        label="Type"
      />
      <Autocomplete
        disablePortal
        id="combo-box-ptfs"
        options={ptfs}
        onChange={(event, value) => setPtf(value)}
        sx={{ width: 250 }}
        value={ptf}
        size="small"
        renderInput={(params) => (
          <TextField {...params} label="Portefeuilles" />
        )}
      />
      <SearchButton
        onClick={() => {
          console.log("Ptf", ptf);
        }}
      />
    </AccordionBox>
  );
};

export default memo(Filter);
