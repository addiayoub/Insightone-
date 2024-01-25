import React, { memo, useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import DfContrib from "./DfContrib";
import Treemap from "../charts/Treemap";
import BarRace from "../charts/BarRace";
import VlChart from "../charts/Backtest/VlChart";
import BarRaceChart from "../Test/Barrace";
import Table from "../Table";
import BacktestData from "../Test/BacktesData.json";
import { contribColumns, divColumns } from "./columns";

const columns = [
  "quantite_ap",
  "portef_ap",
  "poids_ap",
  "df_div",
  "df_contrib",
  "d",
];

const BarRaceData = [
  {
    title: "valo_ap",
    field: "valo_ap",
  },
  {
    title: "poids_ap",
    field: "poids_ap",
  },
  {
    title: "quantite_ap",
    field: "quantite_ap",
  },
];

function Backtest() {
  const { data } = useSelector((state) => state.backtest);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const showData = isShow && !data.loading;
  return (
    <>
      <Filter setIsShow={setIsShow} />
      {data.loading && <MainLoader />}

      {/* {showData && data.df_contrib.length > 0 && (
        <Treemap data={data.df_contrib} />
      )} */}
      {/* <BarRaceChart /> */}
      {/* {showData && data.Rel_div.length > 0 && (
        <BarRace data={data.Rel_div} />
      )} */}
      {/* {showData && data.portef_ap.length > 0 && (
        <VlChart data={data.portef_ap} />
      )}
      {showData &&
        BarRaceData.map(({ field, title }, index) => {
          return (
            data[field].length > 0 && (
              <BarRace data={data.Rel_div} title={title} key={index} />
            )
          );
        })}
       */}
      {showData && data.portef_ap.length > 0 && (
        <>
          <VlChart
            data={data.portef_ap}
            seriesNames={["VL"]}
            title="VL"
            withBubbles
          />
          <VlChart
            data={data.portef_ap}
            seriesNames={["Somme actif_AP"]}
            title="Somme actif_AP"
          />
        </>
      )}
      {showData && data.df_contrib.length > 0 && (
        <Table columns={contribColumns} rows={data.df_contrib} pageSize={10} />
      )}
      {showData && data.df_div.length > 0 && (
        <Table columns={divColumns} rows={data.df_div} pageSize={10} />
      )}
      {/* {showData &&
        data &&
        columns.map((column, index) => {
          return (
            data[column]?.length > 0 && (
              <DfContrib data={data[column]} title={column} key={index} />
            )
          );
        })} */}
    </>
  );
}

export default memo(Backtest);
