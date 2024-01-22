import React, { useState, useEffect, memo } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { Box, Button, Divider, Typography } from "@mui/material";
import TitresComponent from "../TitresComponent";
import SingleSelect from "../SingleSelect";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getAnalyse } from "../../redux/actions/ExpansionActions";

const seuilOptions = ["0.1", "0.2", "0.25", "0.5"];
const periodeOptions = ["YTD", "1an", "3ans", "5ans"];

const Filter = () => {
  const [date, setDate] = useState(dayjs());
  const [opcvm, setOpcvm] = useState("RMA EXPANSION");
  const [seuil, setSeuil] = useState("0.5");
  const [periode, setPeriode] = useState("5ans");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getAnalyse({ date, opcvm, seuil, periode }));
  };
  return (
    <>
      <AccordionBox
        title="paramètres"
        isExpanded
        detailsClass="flex flex-col flex-wrap gap-2"
      >
        <Box className="flex flex-wrap gap-2">
          <DateComponent date={date} setDate={setDate} label="Date" />
          {/* <DateComponent date={dateFin} setDate={setDateFin} label="Date fin" /> */}
        </Box>
        <Divider />
        <Typography className="text-sm">Selection des OPCVM</Typography>
        <TitresComponent selectedTitres={opcvm} setSelectedTitres={setOpcvm} />
        <Divider />
        <Box className="flex flex-wrap gap-2">
          <SingleSelect
            label="Seuil"
            options={seuilOptions}
            value={seuil}
            setValue={setSeuil}
            suffix="%"
          />
          <SingleSelect
            label="Période"
            options={periodeOptions}
            value={periode}
            setValue={setPeriode}
          />
        </Box>
        <Button
          variant="contained"
          className="w-fit"
          onClick={handleClick}
          size="small"
        >
          Rechercher
        </Button>
      </AccordionBox>
    </>
  );
};

export default memo(Filter);
