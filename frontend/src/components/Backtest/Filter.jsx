import React, { useState, memo } from "react";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import AccordionBox from "../AccordionBox";
import ToggleButtons from "../ToggleButtons";
import Contrainte from "../Contrainte";
import { Box, Button, Divider, TextField } from "@mui/material";
import RangeSlider from "../SliderCom";
import { useDispatch } from "react-redux";
import { getPortef } from "../../redux/actions/BacktestActions";
import { notyf } from "../../utils/notyf";
import SavedPtfs from "../portefeuilles/UploadPortefuille/SavedPtfs";
import Upload from "./UploadPtf/Upload";
import SingleSelect from "../SingleSelect";
import TitresComponent from "../TitresComponent";
import { formatDate } from "../../utils/FormatDate";

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

function Filter({ setIsShow }) {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [montant, setMontant] = useState("");
  const [show, setShow] = useState(false);
  const [backtestDate, setBacktestDate] = useState(null);
  const [sens, setSens] = useState(null);
  const [instrument, setInstrument] = useState(null);
  const [qte, setQte] = useState("");
  const [poids, setPoids] = useState("");
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
    setIsShow(false);

    // dispatch(getPortef({ dateDebut, dateFin, filters, montant, upDown }));
    const isValidOp =
      backtestDate !== null &&
      qte !== "" &&
      poids !== "" &&
      sens !== null &&
      instrument !== null;
    console.log("isValidOp", isValidOp);
    const df_op = isValidOp
      ? {
          Date: formatDate(backtestDate["$d"]),
          Sens: sens,
          INSTRUMENT: instrument,
          Quantité: qte,
          Poids: poids,
        }
      : {};

    dispatch(
      getPortef({
        dateDebut,
        dateFin,
        filters,
        montant,
        upDown,
        df_op,
      })
    )
      .unwrap()

      .then((success) => {
        console.log(success);
        setIsShow(true);
      })
      .catch((error) => notyf.error(error));
  };
  return (
    <Box>
      <Upload show={show} setShow={setShow} />
      {show && (
        <AccordionBox title={"Filter"} isExpanded>
          <Box className="flex items-center flex-wrap gap-2 mb-5">
            <DateComponent
              date={dateDebut}
              setDate={setDateDebut}
              label={"Date début"}
            />
            <DateComponent
              date={dateFin}
              setDate={setDateFin}
              label={"Date fin"}
            />
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
            <Contrainte label={"Montant investi (MMAD)"} width={150}>
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
          <Divider />
          <Box className="py-4 flex flex-col gap-2 flex-wrap">
            <Box className="flex gap-2 flex-wrap">
              <DateComponent
                label="Date"
                date={backtestDate}
                setDate={setBacktestDate}
              />
              <SingleSelect
                options={["Achat", "Vente"]}
                value={sens}
                setValue={setSens}
                label="Sens"
              />
              {/* <SingleSelect
                options={["CFG BANK"]}
                value={instrument}
                setValue={setInstrument}
                label="Instrument"
              /> */}
            </Box>
            <TitresComponent
              choice="Actions"
              selectedTitres={instrument}
              setSelectedTitres={setInstrument}
            />
            <Box className="flex gap-2 flex-wrap">
              <TextField
                id="qte"
                label="Quantité"
                size="small"
                type="number"
                value={qte}
                onChange={(event) => setQte(event.target.value)}
                className="min-w-[100px]"
              />
              <TextField
                id="field-poids"
                label="Poids"
                size="small"
                type="number"
                value={poids}
                onChange={(event) => setPoids(event.target.value)}
                className="min-w-[100px]"
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="mt-3"
            onClick={handleSearch}
          >
            Rechercher
          </Button>
        </AccordionBox>
      )}
    </Box>
  );
}

export default memo(Filter);
