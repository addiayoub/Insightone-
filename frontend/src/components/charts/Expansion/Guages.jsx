import React from "react";
import Guage from "./Guage";
import { Box } from "@mui/material";

const indicateurs = {
  perf: [
    "perf_opc",
    "perf_opc_1A",
    "perf_opc_1M",
    "perf_opc_2A",
    "perf_opc_3A",
    "perf_opc_3M",
    "perf_opc_5A",
    "perf_opc_6M",
    "perf_opc_YTD",
    "perf_rel",
    "Ratio_Info",
    "Ratio_sh",
    "Ratio_sortino",
    "Ratio_Treynor",
  ],
  risque: [
    "alpha_J",
    "alpha",
    "BETA",
    "BETA_BEAR",
    "BETA_BULL",
    "correlation",
    "Max_DrawDown_PTF",
    "Max_RunUp_PTF",
  ],
};

const filterByType = (data, type) => {
  return data.filter((item) => indicateurs[type].includes(item.indicateur));
};

const Guages = ({ data }) => {
  console.log("Guages data", data);
  const perfData = filterByType(data, "perf");
  const risqueData = filterByType(data, "risque");
  console.log("perfData", perfData, "risqueData", risqueData);

  return (
    <Box className="flex flex-wrap items-center justify-center m-auto">
      {data.map((item, index) => {
        console.log("item guage", item);
        const value = (item.rang / item.q4) * 100;
        return <Guage value={value} title={item.indicateur} key={index} />;
      })}
    </Box>
  );
};

const GuagesContainer = ({ data }) => {};

export default Guages;
