import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getIndices } from "../../redux/actions/DataActions";
import SelectIndices from "../Markowitz/SelectIndices";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import { Box, Button, TextField } from "@mui/material";
import {
  backtestAction,
  getEvolutionB100Portef,
} from "../../redux/actions/BacktestActions";
import EvolutionB100 from "../charts/EvolutionB100";
import ContribChart from "../charts/Backtest/ContribChart";
import Table from "../Table";
import { contribColumns } from "./Tables/columns";
import Poids from "../charts/Backtest/Poids";
import PoidsDonut from "../charts/Backtest/PoidsDonut";
import DfRendement from "../DfRendement";
import TitresComponent from "../TitresComponent";

const opc = [
  "OPC ACTIONS FGP AJUSTE",
  "OPC DIVERSIFIE FGP AJUSTE",
  "OPC MONETAIRE FGP AJUSTE",
  "OPC OCT FGP AJUSTE",
  "OPC OMLT FGP AJUSTE",
];

const PortefeuilleBacktest = ({ initOpcvm = null }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [opcvm, setOpcvm] = useState(initOpcvm);
  const {
    evolutionB100Ptfs: { loading, data },
    backtestData: backData,
    selectedPtf,
    ptfToBacktest,
  } = useSelector((state) => state.backtest);
  const dispatch = useDispatch();
  const [indices, setIndices] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedOPC, setSelectedOPC] = useState([]);
  const [rf, setRf] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getIndices())
      .unwrap()
      .then(({ data }) => {
        console.log("getIndices data", data);
        const indices = data
          .filter((item) => item.classe === "ACTIONS" || item.classe === "TAUX")
          .map((item) => item.NOM_INDICE);
        setIndices(indices);
      })
      .catch(() => notyf.error("Error fetch Indices"))
      .finally(() => setIsLoading(false));
  }, []);
  const handleBacktest = () => {
    console.log("ptfToBacktest", ptfToBacktest);
    const list_indices = [opcvm, ...selectedIndices, ...selectedOPC].filter(
      (item) => item !== null
    );
    setIsShow(false);
    dispatch(
      getEvolutionB100Portef({
        dateDebut,
        dateFin,
        list_indices,
      })
    )
      .unwrap()
      .then(() => dispatch(backtestAction({ rf })))
      .then(() => setIsShow(true))
      .catch((err) => {
        console.log("err", err);
        notyf.error("Error Evolution B100");
      });
  };
  const isDisabled =
    (selectedIndices.length < 1 && selectedOPC.length < 1 && !opcvm) ||
    rf === "";
  const showLoading = isLoading || loading || backData.loading;
  console.log("backData.data.keyPerf", backData.data.keyPerf);
  // const keyPerfColumns = generateKeyPerfColumns([
  //   selectedPtf,
  //   ...selectedIndices,
  //   ...selectedOPC,
  // ]);

  return (
    <>
      <AccordionBox title="Backtest" isExpanded={true}>
        <Box className="flex flex-wrap gap-3 items-center">
          <DateComponent
            date={dateDebut}
            setDate={setDateDebut}
            label="Date Début"
          />
          <DateComponent date={dateFin} setDate={setDateFin} label="Date Fin" />
          <SelectIndices
            indices={indices}
            selectedIndices={selectedIndices}
            setSelectedIndices={setSelectedIndices}
            label="Indices"
          />
          <SelectIndices
            indices={opc}
            selectedIndices={selectedOPC}
            setSelectedIndices={setSelectedOPC}
            label="OPC"
          />
          <TitresComponent
            choice="OPCVM"
            selectedTitres={opcvm}
            setSelectedTitres={setOpcvm}
          />
          <TextField
            id="rf-dep"
            label="Risk Free Rate"
            type="number"
            size="small"
            value={rf}
            onChange={(event) => {
              setRf(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          size="small"
          className="my-2"
          onClick={handleBacktest}
          disabled={isDisabled}
        >
          Backtester
        </Button>
      </AccordionBox>
      <Box
        className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12
        xl:grid-cols-12 gap-y-4 gap-x-12 mt-24 items-center"
      >
        <Box className="md:col-span-6 lg:col-span-6 xl:col-span-6">
          <Box>
            {!loading && isShow && data.ptfsData.length > 0 && (
              <>
                <EvolutionB100 data={data.ptfsData} isGrid />
              </>
            )}
          </Box>
          <Box>
            {!loading && isShow && data.df_poids.length > 0 && (
              <>
                <Poids data={data.df_poids} />
              </>
            )}
          </Box>
        </Box>
        <Box className="md:col-span-6 lg:col-span-6 xl:col-span-6">
          {!loading && isShow && data.ptfsContrib.length > 0 && (
            <ContribChart data={data.ptfsContrib} />
          )}
          {!loading && isShow && data.ptfsContrib.length > 0 && (
            <Box className="flex flex-wrap justify-center gap-4">
              <Box className="basis-3/12">
                <PoidsDonut
                  data={data.ptfsContrib}
                  field={"poids_initial"}
                  title={"Poids initial"}
                />
              </Box>
              <Box className="basis-3/12">
                <PoidsDonut
                  data={data.ptfsContrib}
                  field={"poids_final"}
                  title={"Poids final"}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {!loading && isShow && data.ptfsContrib.length > 0 && (
        <>
          <Table
            columns={contribColumns}
            rows={data.ptfsContrib}
            pageSize={10}
            className="h-max"
            legend={`Contribution ${data.ptfsContrib[0].PTF}`}
          />
        </>
      )}
      {isShow && <DfRendement />}
      {showLoading && <MainLoader />}
    </>
  );
};

export default memo(PortefeuilleBacktest);
