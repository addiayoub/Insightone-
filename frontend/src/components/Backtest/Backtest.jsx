import React, { useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import DfContrib from "./DfContrib";
import Treemap from "../charts/Treemap";
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
  const dispatch = useDispatch();
  return (
    <>
      <Filter />
      {!data.loading && data.df_contrib.length > 0 && (
        <Treemap data={data.df_contrib} />
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
