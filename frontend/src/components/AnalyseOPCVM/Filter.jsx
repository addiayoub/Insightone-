import React, { useState, memo } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { Box, Button, Divider, Typography } from "@mui/material";
import TitresComponent from "../TitresComponent";
import SingleSelect from "../SingleSelect";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getAnalyse } from "../../redux/actions/ExpansionActions";

const seuilOptions = [0.1, 0.2, 0.25, 0.5];
const periodeOptions = ["YTD", "1an", "3ans", "5ans"];

const Filter = ({ setIsShow }) => {
  const [date, setDate] = useState(dayjs());
  const [opcvm, setOpcvm] = useState("RMA EXPANSION");
  const [seuil, setSeuil] = useState(0.5);
  const [periode, setPeriode] = useState("5ans");
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsShow(false);
    dispatch(getAnalyse({ date, opcvm, seuil, periode }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch();
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
        </Box>
        <Divider />
        <Typography className="text-sm">Selection des OPCVM</Typography>
        <TitresComponent
          selectedTitres={opcvm}
          setSelectedTitres={setOpcvm}
          choice="OPCVM"
        />
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
