import React, { useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { TextField, Box, Button, Typography, Divider } from "@mui/material";
import IndicesComponent from "../IndicesComponent";
import SingleSelect from "../SingleSelect";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { generationPtfAlea } from "../../redux/actions/TrackingActions";
import TitresComponent from "../TitresComponent";

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [nbSim, setNbSim] = useState("");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [opcvm, setOpcvm] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("selectedIndices", selectedIndices);
  }, [selectedIndices]);
  const handleClick = () => {
    setIsShow(false);
    dispatch(
      generationPtfAlea({
        nbSim,
        dateDebut,
        dateFin,
        indices: selectedIndices,
        opcvm,
      })
    )
      .unwrap()
      .then(() => setIsShow(true))
      .catch()
      .finally();
  };
  const isDisabled = selectedIndices.length < 1 || nbSim === "" || !opcvm;
  return (
    <AccordionBox
      title="paramètres de backtest"
      isExpanded
      detailsClass="flex flex-col flex-wrap gap-2"
    >
      <Box className="flex flex-wrap gap-2">
        <DateComponent
          date={dateDebut}
          setDate={setDateDebut}
          label="Date Début"
        />
        <DateComponent date={dateFin} setDate={setDateFin} label="Date fin" />
        <TextField
          id="nb-simulations"
          label="Nb Simulation"
          type="number"
          size="small"
          value={nbSim}
          onChange={(event) => {
            setNbSim(event.target.value);
          }}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
      </Box>
      <Divider />
      <Typography className="text-sm">Selection des OPCVM</Typography>
      <TitresComponent selectedTitres={opcvm} setSelectedTitres={setOpcvm} />
      <Divider />
      <Typography className="text-sm">Selection des indices</Typography>
      <IndicesComponent
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
      />
      <Button
        variant="contained"
        className="w-fit"
        disabled={isDisabled}
        onClick={handleClick}
        size="small"
      >
        Rechercher
      </Button>
    </AccordionBox>
  );
};

export default Filter;
