import React, { useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { TextField, Box, Button } from "@mui/material";
import IndicesComponent from "../IndicesComponent";
import SingleSelect from "../SingleSelect";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { generationPtfAlea } from "../../redux/actions/TrackingActions";

const opc = [
  "OPC ACTIONS FGP AJUSTE",
  "OPC DIVERSIFIE FGP AJUSTE",
  "OPC MONETAIRE FGP AJUSTE",
  "OPC OCT FGP AJUSTE",
  "OPC OMLT FGP AJUSTE",
];

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [nbSim, setNbSim] = useState("");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [opcvm, setOpcvm] = useState("");
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
  const isDisabled = !selectedIndices || nbSim === "" || !opcvm;
  return (
    <AccordionBox
      title="Filter"
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
        <SingleSelect
          options={opc}
          value={opcvm}
          setValue={setOpcvm}
          label="OPCVM"
        />
      </Box>
      <IndicesComponent
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
      />
      <Button
        variant="contained"
        className="w-fit"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Rechercher
      </Button>
    </AccordionBox>
  );
};

export default Filter;
