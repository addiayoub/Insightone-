import React from "react";
import Guage from "./Guage";
import { Box } from "@mui/material";
import Choice from "../../portefeuilles/Choice";

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
  const rdtData = data.filter(
    (item) =>
      !indicateurs.perf.includes(item.indicateur) &&
      !indicateurs.risque.includes(item.indicateur)
  );
  console.log("perfData", perfData, "risqueData", risqueData);
  const tabs = [
    {
      label: "Performance",
      component: GuagesContainer,
      props: { data: perfData },
    },
    {
      label: "Risque",
      component: GuagesContainer,
      props: { data: risqueData },
    },
    {
      label: "Rdt/Risque",
      component: GuagesContainer,
      props: { data: rdtData },
    },
  ];
  return <Choice tabs={tabs} />;
};

const GuagesContainer = ({ data }) => {
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

export default Guages;
