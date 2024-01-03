import React, { useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import DfContrib from "./DfContrib";
import Treemap from "../charts/Treemap";
import BarRace from "../charts/BarRace";
import VlChart from "./VlChart";
import BarRaceChart from "../Test/Barrace";

const columns = [
  "df_contrib",
  "Rel_div",
  "qte_div",
  "quantite_av",
  "quantite_ap",
  "div_ord",
  "div_exc",
  "portef_ap",
  "portef_av",
  "valo_ap",
  "valo_av",
  "operation_mnt",
  "operation_qte",
  "poids_ap",
  "poids_av",
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
  return (
    <>
      <Filter />
      {!data.loading && data.df_contrib.length > 0 && (
        <Treemap data={data.df_contrib} />
      )}
      {/* <BarRaceChart /> */}
      {/* {!data.loading && data.Rel_div.length > 0 && (
        <BarRace data={data.Rel_div} />
      )} */}
      {!data.loading && data.portef_ap.length > 0 && (
        <VlChart data={data.portef_ap} />
      )}
      {data.loading && <MainLoader />}
      {!data.loading &&
        BarRaceData.map(({ field, title }, index) => {
          return (
            data[field].length > 0 && (
              <BarRace data={data.Rel_div} title={title} key={index} />
            )
          );
        })}
      {columns.map((column, index) => {
        return (
          data[column].length > 0 && (
            <DfContrib data={data[column]} title={column} key={index} />
          )
        );
      })}
    </>
  );
}

export default Backtest;
