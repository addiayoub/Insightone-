import React, { useEffect } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { testApi } from "../../redux/actions/OpcvmActions";
import MainLoader from "../loaders/MainLoader";
import DfContrib from "./DfContrib";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
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
  var deMarch = moment("2017-03");
  console.log("moment", deMarch.format("MMMM"), moment.locale("fr"));
  return (
    <>
      <Filter />
      {data.loading && <MainLoader />}
      {/* {!data.loading && data.data && (
        <DfContrib data={data.data["df_contrib"]} />
      )} */}
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
