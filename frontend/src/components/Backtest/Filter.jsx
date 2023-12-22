import React, { useState } from "react";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import AccordionBox from "../AccordionBox";
import ToggleButtons from "../ToggleButtons";
import Contrainte from "../Contrainte";
import { Box, Button, TextField } from "@mui/material";
import RangeSlider from "../SliderCom";
import { useDispatch } from "react-redux";
import { getPortef } from "../../redux/actions/BacktestActions";

const buttons = [
  {
    label: "flag_hebdo",
    text: "Fréquence de backtest",
    values: [
      {
        text: "Quotidien",
        value: 0,
      },
      {
        text: "Hebdomadaire",
        value: 1,
      },
    ],
  },
  {
    label: "cmp_cloture",
    text: "Cours d'éxecution",
    values: [
      {
        text: "Clôture",
        value: 0,
      },
      {
        text: "CPM",
        value: 1,
      },
    ],
  },
  {
    label: "div_reinvesti",
    text: "Dividendes",
    values: [
      {
        text: "Cash",
        value: 0,
      },
      {
        text: "Réinvesti",
        value: 1,
      },
    ],
  },
  {
    label: "flag_trading",
    text: "Trading",
    values: [
      {
        text: "Non",
        value: 0,
      },
      {
        text: "Oui",
        value: 1,
      },
    ],
  },
  {
    label: "momentum_contrarien",
    text: "Stratégie de trading",
    values: [
      {
        text: "Momentume",
        value: 0,
      },
      {
        text: "Contrarian",
        value: 1,
      },
    ],
  },
];

function Filter() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [montant, setMontant] = useState("");
  // const [upDown, setUpDown] = useState({
  //   upDown: {
  //     min: 0,
  //     max: 10,
  //   },
  // });
  const [upDown, setUpDown] = useState("");
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    flag_hebdo: 0,
    cmp_cloture: 0,
    div_reinvesti: 0,
    flag_trading: 0,
    momentum_contrarien: 0,
  });

  const onButtonsChange = (label, newValue) => {
    console.log("label", label, newValue);
    setFilters((prevState) => ({
      ...prevState,
      [label]: newValue,
    }));
  };
  const handleSliderChange = (label, sliderValues) => {
    setUpDown((prevState) => ({
      ...prevState,
      [label]: { min: +sliderValues[0], max: +sliderValues[1] },
    }));
  };
  const handleBlur = () => {
    if (+upDown < 0) {
      setUpDown(0);
    }
    if (+upDown > 10) {
      setUpDown(10);
    }
  };
  const handleSearch = () => {
    console.log(filters, montant, upDown);
    // dispatch(getPortef({ dateDebut, dateFin, filters, montant, upDown }));
    dispatch(getPortef());
  };
  return (
    <AccordionBox title={"Filter"} isExpanded={true}>
      <Box className="flex items-center flex-wrap gap-2 mb-5">
        <DateComponent
          date={dateDebut}
          setDate={setDateDebut}
          label={"Date début"}
        />
        <DateComponent date={dateFin} setDate={setDateFin} label={"Date fin"} />
      </Box>

      <Box>
        {buttons.map(({ label, text, values }) => {
          return (
            <Contrainte label={text} width={150} key={label}>
              <ToggleButtons
                buttons={values}
                init={filters[label]}
                label={label}
                onButtonsChange={onButtonsChange}
              />
            </Contrainte>
          );
        })}
        <Contrainte label={"Montant investi"} width={150}>
          <TextField
            id="montant-investi"
            label=""
            size="small"
            type="number"
            value={montant}
            onChange={(event) => setMontant(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="min-w-[100px]"
          />
        </Contrainte>
        <Contrainte label={"Potentiel Upside/Downside"} width={150}>
          <TextField
            id="upside-downside"
            label=""
            size="small"
            type="number"
            value={upDown}
            onChange={(event) => setUpDown(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
            onBlur={handleBlur}
            className="min-w-[202px]"
          />
        </Contrainte>
        {/* <Contrainte label={"Potentiel Upside/Downside"} width={150}>
          <RangeSlider
            min={0}
            minLabel={""}
            maxLabel={""}
            max={10}
            step={1}
            percentage={false}
            int={true}
            label={"upDown"}
            values={[upDown.upDown.min, upDown.upDown.max]}
            onValuesChange={handleSliderChange}
          />
        </Contrainte> */}
      </Box>

      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleSearch}
      >
        Rechercher
      </Button>
    </AccordionBox>
  );
}

export default Filter;
