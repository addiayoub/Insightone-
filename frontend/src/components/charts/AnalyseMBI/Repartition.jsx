import React, { memo, useMemo } from "react";
import PieChart from "../Default/PieChart";
import { defaultPie } from "../../../utils/chart/defaultOptions";
import { sumOfField } from "../../../utils/sumOfField";
import { sumIf } from "../../../utils/caluclations";
import moment from "moment";
import { findMinMax } from "../../../utils/findMinMax";
const getSeries = (data) => {
  return data
    .map((item) => ({ name: item.TITRE, value: item.poids }))
    .sort((a, b) => b.value - a.value);
};

const getFacialData = (data) => {
  function getFacialRef(max) {
    const result = [];
    const maxValue = max > 0 ? max : 1; // Ensure max is at least 1

    for (let i = 1; i <= maxValue; i++) {
      result.push(i);
    }

    return result;
  }
  let { max } = findMinMax(data, "TAUX_FACIAL");
  max = Math.trunc(max * 100);
  const facialRef = getFacialRef(max);
  const facial = data.map((item) => Math.trunc(item["TAUX_FACIAL"] * 100));
  const poids = data.map((item) => item["poids"]);
  return facialRef
    .map((item) => ({
      name: item + "%",
      value: sumIf(facial, item, poids) * 100,
    }))
    .sort((a, b) => b.value - a.value);
};

const getDateJouiData = (data) => {
  const years = data.map((item) => moment(item.DATE_JOUISSANCE).year());
  const yearsCre = [...new Set(years)];
  const poids = data.map((item) => item["poids"]);
  return yearsCre
    .map((item) => ({
      name: item,
      value: sumIf(years, item, poids) * 100,
    }))
    .sort((a, b) => b.value - a.value);
};

const titleRef = {
  titre: "Répartition par Titre",
  facial: "Répartition par taux facial",
  jouissance: "Répartition par date de jouissance",
};

const getChoix = (data, choix) => {
  switch (choix) {
    case "titre":
      return getSeries(data);
    case "facial":
      return getFacialData(data);
    case "jouissance":
      return getDateJouiData(data);
    default:
      return getSeries(data);
  }
};

const Repartition = ({ data, type = "titre" }) => {
  const seriesData = useMemo(() => getChoix(data, type), [data, type]);

  const options = useMemo(() => {
    return {
      title: {
        text: titleRef[type],
        left: "center",
      },
      series: {
        ...defaultPie,
        data: seriesData,
      },
    };
  }, [seriesData]);
  return (
    <PieChart
      options={options}
      style={{
        maxHeight: "500px",
        height: "500px",
      }}
    />
  );
};

export default memo(Repartition);
