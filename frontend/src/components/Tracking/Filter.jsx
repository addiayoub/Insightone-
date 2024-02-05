import React, { useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import { TextField, Box, Button, Typography, Divider } from "@mui/material";
import IndicesComponent from "../IndicesComponent";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { generationPtfAlea } from "../../redux/actions/TrackingActions";
import TitresComponent from "../TitresComponent";
import Contrainte from "../Contrainte";
import ToggleButtons from "../ToggleButtons";
import {
  backtestAction,
  getEvolutionB100Portef,
} from "../../redux/actions/BacktestActions";
import { setSelectedPtf } from "../../redux/slices/BacktestSlice";
import SelectedTitres from "../charts/SelectedTitres";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { notyf } from "../../utils/notyf";
import { SearchButton } from "../Ui/Buttons";

const buttons = [
  {
    label: "ajuster_label",
    text: "Ajuster",
    values: [
      {
        text: "Oui",
        value: 1,
      },
      {
        text: "Non",
        value: 0,
      },
    ],
  },
];

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [nbSim, setNbSim] = useState(20);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [choice, setChoice] = useState(0);
  const [opcvm, setOpcvm] = useState(null);
  const [actions, setActions] = useState([]);
  console.log("render filter Tracking");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("selectedIndices", selectedIndices);
  }, [selectedIndices]);
  const list = [...selectedIndices, ...actions];
  const handleClick = () => {
    setIsShow(false);
    dispatch(
      generationPtfAlea({
        nbSim,
        dateDebut,
        dateFin,
        indices: list,
        opcvm,
        ajuster: choice,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(setSelectedPtf(opcvm));
        dispatch(
          backtestAction({
            rf: 2,
            fromSlice: "tracking",
          })
        )
          .then(() => setIsShow(true))
          .catch((e) => notyf.error("Internal Server Error"));
      })
      .catch((e) => notyf.error("Internal Server Error"))
      .finally();
  };
  const isDisabled = list.length < 1 || nbSim === "" || !opcvm;
  return (
    <>
      <AccordionBox
        title="paramètres de tracking"
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
        <TitresComponent
          selectedTitres={opcvm}
          setSelectedTitres={setOpcvm}
          choice="OPCVM"
        />
        <Divider />
        <Typography className="text-sm">Selection des indices</Typography>
        {/* <IndicesComponent
          selectedIndices={selectedIndices}
          setSelectedIndices={setSelectedIndices}
        /> */}
        <TitresComponent
          isMultipl
          selectedTitres={selectedIndices}
          setSelectedTitres={setSelectedIndices}
          choice="Indices"
        />
        <Divider />
        <Typography className="text-sm">Selection des Actions</Typography>
        <TitresComponent
          selectedTitres={actions}
          setSelectedTitres={setActions}
          isMultipl
          choice="Actions"
        />
        <Divider />
        {buttons.map(({ label, text, values }) => {
          return (
            <Box
              label={text}
              key={label}
              className="flex flex-wrap gap-2 items-center mb-2"
            >
              <Typography className="text-sm">{text}</Typography>
              <ToggleButtons
                buttons={values}
                init={choice}
                label={label}
                onButtonsChange={(label, newValue) => setChoice(newValue ?? 0)}
              />
            </Box>
          );
        })}
        {list.length > 0 && <SelectedIndices list={list} />}
        {list.length > 0 && <SelectedTitres selectedTitres={list} />}
        <SearchButton
          className="w-fit mt-3"
          disabled={isDisabled}
          onClick={handleClick}
        />
      </AccordionBox>
    </>
  );
};

const SelectedIndices = ({ list }) => {
  return (
    <Box className="my-3">
      <Typography className="text-base mb-2 font-medium">
        La liste des titres sélectionnés
      </Typography>
      <Box
        className="max-h-48 overflow-y-auto max-w-[280px] w-[280px] p-2"
        sx={{
          border: "3px solid var(--primary-color)",
          borderRadius: "5px",
        }}
      >
        {list.map((item, index) => {
          return (
            <p key={index} className="leading-7 font-medium">
              {item}
            </p>
          );
        })}
      </Box>
    </Box>
  );
};

export default Filter;
