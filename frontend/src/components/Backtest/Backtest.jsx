import React, { useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import DfContrib from "./DfContrib";
import Treemap from "../charts/Treemap";
import BarRace from "../charts/BarRace";
import VlChart from "./VlChart";
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
      {/* {!data.loading && data.Rel_div.length > 0 && (
        <BarRace data={data.Rel_div} />
      )} */}
      {!data.loading && data.portef_ap.length > 0 && (
        <VlChart data={data.portef_ap} />
      )}
      {data.loading && <MainLoader />}

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
