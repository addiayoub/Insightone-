import React, { memo, useState } from "react";
import AccordionBox from "../../AccordionBox";
import { TextField, Box } from "@mui/material";
import DateComponent from "../../DateComponent";
import dayjs from "dayjs";
import TitresComponent from "../../TitresComponent";
import { SearchButton } from "../../Ui/Buttons";
import { useDispatch } from "react-redux";
import { meanRiskOptiAction } from "../../../redux/actions/BlackLittermanActions";

const Filter = () => {
  const [points, setPoints] = useState(50);
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs().subtract(2, "day"));
  const [selectedTitres, setSelectedTitres] = useState([
    "AFMA",
    "ITISSALAT AL-MAGHRIB",
  ]);
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(
      meanRiskOptiAction({ points, dateDebut, dateFin, titres: selectedTitres })
    );
    console.log("HandleSearch");
  };
  return (
    <AccordionBox
      title="Mean Risk Optimization"
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
          id="nb-points"
          size="small"
          label="Nb Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
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

export default memo(Filter);
