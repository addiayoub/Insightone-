import React from "react";
import Guage from "./Guage";
import { Box } from "@mui/material";
import Choice from "../../portefeuilles/Choice";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const notPercent = ["encours_OPC", "Period_DrawDown_PTF"];

const indicateurs = {
  perf: [
    "perf_opc",
    "perf_opc_1A",
    "encours_OPC",
    "perf_opc_1S",
    "perf_opc_2A",
    "perf_opc_3A",
    "perf_opc_3M",
    "perf_opc_5A",
    "perf_opc_6M",
    "perf_opc_1M",
    "perf_opc_YTD",
    "perf_rel",
    "Prct_GAIN_ABS",
    "Prct_GAIN_REL",
  ],
  risque: [
    "BETA",
    "BETA_BEAR",
    "BETA_BULL",
    "correlation",
    "Max_DrawDown_PTF",
    "Max_RunUp_PTF",
    "Var_Bench_95",
    "Var_Bench_99",
    "Var_Ptf_95",
    "Var_Ptf_99",
    "vol_baisse_opc",
    "vol_baisse_opc_1an",
    "vol_opc",
    "vol_opc_1an",
  ],
};

const filterByType = (data, type) => {
  return data.filter((item) => indicateurs[type].includes(item.indicateur));
};

const Guages = ({ data }) => {
  console.log("Guages data", data);
  console.log(
    "cate guage",
    data.map((item) => item.indicateur)
  );
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
        const title = item.indicateur;
        const value = (item.rang / item.q4) * 100;
        const valeur = item.valeur;
        const valueToShow = notPercent.includes(title)
          ? formatNumberWithSpaces(valeur)
          : (valeur * 100).toFixed(2) + "%";
        return (
          <Guage
            value={value}
            valueToShow={valueToShow}
            title={title}
            key={`${item.indicateur}-${index}`}
          />
        );
      })}
    </Box>
  );
};

export default Guages;
