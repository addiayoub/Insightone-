import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getIndices } from "../../redux/actions/DataActions";
import SelectIndices from "../Markowitz/SelectIndices";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import { Button } from "@mui/material";
import {
  backtestAction,
  getEvolutionB100Portef,
} from "../../redux/actions/BacktestActions";
import EvolutionB100 from "../charts/EvolutionB100";
import Portefeuille from "../OPCVM/Portefeuille";
import PortefeuilleMarko from "../Markowitz/Portefeuille";
import PortefeuilleTable from "../OPCVM/PortefeuilleTable";
import PortefeuilleTableMarko from "../Markowitz/PortefeuilleTable";
import TabsComponent from "../TabsComponent";
import ContribChart from "../charts/Backtest/ContribChart";
import Cumualative from "../charts/Backtest/Cumualative";
import EoyChart from "../charts/Backtest/EoyChart";
import DistrubitionMonthly from "../charts/Backtest/DistrubitionMonthly";
import Rolling from "../charts/Backtest/Rolling";
import WorstDrawDowns from "../charts/Backtest/WorstDrawDowns";
import MonthlyReturns from "../charts/Backtest/MonthlyReturns";
import Table from "../Table";
import { eoyColumns, worstDrawdownsColumns } from "./Tables/columns";
import DailyReturns from "../charts/Backtest/DailyReturns";

const opc = [
  "OPC ACTIONS FGP AJUSTE",
  "OPC DIVERSIFIE FGP AJUSTE",
  "OPC MONETAIRE FGP AJUSTE",
  "OPC OCT FGP AJUSTE",
  "OPC OMLT FGP AJUSTE",
];

const PortefeuilleBacktest = ({ backtestData }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const {
    evolutionB100Ptfs: { loading, data },
    backtestData: backData,
  } = useSelector((state) => state.backtest);
  const dispatch = useDispatch();
  const [indices, setIndices] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedOPC, setSelectedOPC] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getIndices())
      .unwrap()
      .then(({ indices }) => {
        setIndices(indices);
      })
      .catch(() => notyf.error("Error fetch Indices"))
      .finally(() => setIsLoading(false));
  }, []);
  const handleBacktest = () => {
    console.log("backtestData", backtestData);
    setIsShow(false);
    dispatch(
      getEvolutionB100Portef({
        dateDebut,
        dateFin,
        backtestData,
        list_indices: [...selectedIndices, ...selectedOPC],
      })
    )
      .unwrap()
      .then(() => dispatch(backtestAction()))
      .then(() => setIsShow(true))
      .catch(() => notyf.error("Error Evolution B100"));
  };
  const showLoading = isLoading || loading || backData.loading;
  return (
    <>
      <AccordionBox
        title="Backtest"
        isExpanded={true}
        detailsClass="flex flex-wrap gap-3 items-center"
      >
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
          label="Indices"
        />
        <Button variant="contained" size="small" onClick={handleBacktest}>
          Backtester
        </Button>
      </AccordionBox>
      {backData.loading && "LOADING"}
      {!loading && isShow && data.ptfsContrib.length > 0 && (
        <>
          <ContribChart data={data.ptfsContrib} />
        </>
      )}
      {!backData.loading && isShow && backData.data.cumulative.length > 0 && (
        <>
          <Cumualative data={backData.data.cumulative} />
        </>
      )}
      {!backData.loading && isShow && backData.data.eoy.length > 0 && (
        <>
          <EoyChart data={backData.data.eoy} />
        </>
      )}
      {!backData.loading &&
        isShow &&
        backData.data.distributionMonthly.length > 0 && (
          <>
            <DistrubitionMonthly data={backData.data.distributionMonthly} />
          </>
        )}
      {!backData.loading && isShow && backData.data.dailyReturns.length > 0 && (
        <>
          <DailyReturns data={backData.data.dailyReturns} />
        </>
      )}
      {!backData.loading && isShow && backData.data.rollingBeta.length > 0 && (
        <>
          <Rolling
            data={backData.data.rollingBeta}
            title="Rolling Beta to Benchmark"
          />
        </>
      )}
      {!backData.loading && isShow && backData.data.rollingVolat.length > 0 && (
        <>
          <Rolling
            data={backData.data.rollingVolat}
            title="Rolling Volatility (6-Months)"
          />
        </>
      )}
      {!backData.loading &&
        isShow &&
        backData.data.rollingSharpe.length > 0 && (
          <>
            <Rolling
              data={backData.data.rollingSharpe}
              title="Rolling Sharp (6-Months)"
            />
          </>
        )}
      {!backData.loading &&
        isShow &&
        backData.data.rollingSortino.length > 0 && (
          <>
            <Rolling
              data={backData.data.rollingSortino}
              title="Rolling Sortino (6-Months)"
            />
          </>
        )}
      {!backData.loading &&
        isShow &&
        backData.data.worstDrawdowns.length > 0 && (
          <>
            <WorstDrawDowns data={backData.data.worstDrawdowns} />
          </>
        )}
      {!backData.loading &&
        isShow &&
        backData.data.monthlyReturns.length > 0 && (
          <>
            <MonthlyReturns data={backData.data.monthlyReturns} />
          </>
        )}
      {!backData.loading && isShow && backData.data.quantiles.length > 0 && (
        <>
          <Rolling data={backData.data.quantiles} title="Return Quantiles" />
        </>
      )}
      {!backData.loading && isShow && backData.data.eoyTable.length > 0 && (
        <>
          <h3>EOY Returns vs Benchmark</h3>
          <Table columns={eoyColumns} rows={backData.data.eoyTable} />
        </>
      )}
      {!backData.loading &&
        isShow &&
        backData.data.worstDrawdowns.length > 0 && (
          <>
            <h3>Worst 10 Drawdowns</h3>
            <Table
              columns={worstDrawdownsColumns}
              rows={backData.data.worstDrawdowns}
            />
          </>
        )}
      {!loading && isShow && data.ptfsData.length > 0 && (
        <>
          <EvolutionB100 data={data.ptfsData} />
          {/* {backtestData.map(({ data, type, field }) => {
            return type === "OPCVM" ? (
              <PortefeuilleTable rows={data} field={field} />
            ) : (
              <PortefeuilleTableMarko rows={data} field={field} />
            );
          })} */}
          {/* <TabsComponent tabs={backtestData} /> */}
        </>
      )}
      {showLoading && <MainLoader />}
    </>
  );
};

export default memo(PortefeuilleBacktest);
