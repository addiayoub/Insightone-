import React, { memo, useMemo } from "react";
import PieChart from "../Default/PieChart";
import { defaultPie } from "../../../utils/chart/defaultOptions";
import { sumOfField } from "../../../utils/sumOfField";
import { sumIf } from "../../../utils/caluclations";
import moment from "moment";
const getSeries = (data) => {
  return data
    .map((item) => ({ name: item.TITRE, value: item.poids }))
    .sort((a, b) => b.value - a.value);
};

const getFacialData = (data) => {
  const facialRef = [1, 2, 3, 4, 5, 6];
  const facial = data.map((item) => Math.trunc(item["TAUX_FACIAL"]));
  const poids = data.map((item) => item["poids"]);
  return facialRef
    .map((item) => ({
      name: item,
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

const Repartition = ({ data, type = "titre" }) => {
  const seriesData = useMemo(() => {
    switch (type) {
      case "titre":
        return getSeries(data);
      case "facial":
        return getFacialData(data);
      case "jouissance":
        return getDateJouiData(data);
      default:
        return getSeries(data);
    }
  }, [data]);
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
