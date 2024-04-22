import React, { useState } from "react";
import AccordionBox from "../../Ui/AccordionBox";
import { TextField, Box } from "@mui/material";
import DateComponent from "../../DateComponent";
import dayjs from "dayjs";
import TitresComponent from "../../TitresComponent";
import { SearchButton } from "../../Ui/Buttons";
import { useDispatch } from "react-redux";
import { portfolioOptiAction } from "../../../redux/actions/BlackLittermanActions";

const Filter = () => {
  const [nbPtfs, setNbPtfs] = useState(1000);
  const [dateDebut, setDateDebut] = useState(dayjs("12/25/2020"));
  const [dateFin, setDateFin] = useState(dayjs("02/02/2024"));
  const [selectedTitres, setSelectedTitres] = useState([
    "AFMA",
    "ITISSALAT AL-MAGHRIB",
    "ATTIJARIWAFA BANK",
  ]);
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(
      portfolioOptiAction({
        nbPtfs,
        dateDebut,
        dateFin,
        // titres: ["BCP", "ATW", "BOA"],
        titres: selectedTitres,
      })
    );
  };
  return (
    <AccordionBox
      title="Portfolio Optimization"
      detailsClass="flex flex-wrap flex-col gap-2"
      isExpanded
    >
      <Box className=" flex flex-wrap items-center gap-2">
        <DateComponent
          date={dateDebut}
          setDate={setDateDebut}
          label="Date début"
        />
        <DateComponent date={dateFin} setDate={setDateFin} label="Date fin" />
        <TextField
          id="nb-ptfs"
          size="small"
          label="Nb Portefeuilles"
          value={nbPtfs}
          onChange={(e) => setNbPtfs(e.target.value)}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
      </Box>

      <TitresComponent
        choice="Actions"
        {...{ selectedTitres, setSelectedTitres }}
        isMultipl
      />
      <SearchButton className="w-fit" onClick={handleSearch} />
    </AccordionBox>
  );
};

export default Filter;
