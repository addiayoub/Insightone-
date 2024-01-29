import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import generateCategorieSeries from "../../../utils/generateCategorieSeries";

const generateOptions = (
  seriesNames,
  seriesData,
  selectedLegend,
  title,
  theme
) => {
  return {
    title: {
      text: title,
      left: "center",
      ...theme.title,
    },
    tooltip: {
      trigger: "item",
      valueFormatter: (value) => value?.toFixed(2) + "%",
      confine: true,
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        dataView: {},
      },
      right: 0,
      top: 15,
    },
    legend: {
      data: seriesNames,
      type: "scroll",
      orient: "horizontal",
      zLevel: 23,
      width: "60%",
      left: "center",
      bottom: "0",
      selected: selectedLegend,
      ...theme.legend,
    },
    grid: {
      top: "0%",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
    ],
  };
};

const SMIPoids = ({ SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids, SIM);
  const theme = useChartTheme();
  const seriesData = useMemo(
    () =>
      df_poids
        .map((item) => ({
          value: item[SIM] * 100,
          name: item.titre,
        }))
        .filter((serie) => serie.value > 0.001)
        .sort((a, b) => b.value - a.value),
    [df_poids, SIM]
  );
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );
  const { SeriesSelector, selectedLegend } = useSeriesSelector(
    seriesNames,
    seriesNames
  );

  const categorieSeries = useMemo(
    () => generateCategorieSeries(seriesData),
    [seriesData]
  );
  const categorieSeriesNames = useMemo(
    () => categorieSeries.map((serie) => serie.name),
    [categorieSeries]
  );

  const { SeriesSelector: SeriesSelector2, selectedLegend: selectedLegend2 } =
    useSeriesSelector(categorieSeriesNames, categorieSeriesNames);

  console.log(
    "SIM POIDS",
    seriesData.filter((serie) => serie.value > 0),
    categorieSeries,
    categorieSeriesNames
  );

  const options = useMemo(
    () =>
      generateOptions(seriesNames, seriesData, selectedLegend, "Titres", theme),
    [theme, seriesData, seriesNames, selectedLegend, SIM]
  );

  const optionsForCategories = useMemo(
    () =>
      generateOptions(
        categorieSeriesNames,
        categorieSeries,
        selectedLegend2,
        "Catégories",
        theme
      ),
    [categorieSeriesNames, categorieSeries, selectedLegend2, SIM, theme]
  );
  console.log("options", optionsForCategories);
  return (
    <>
      <SeriesSelector />
      <ReactECharts
        option={options}
        style={{
          height: 400,
          width: 500,
          // maxWidth: 500,
        }}
      />
      <SeriesSelector2 />
      <ReactECharts
        option={optionsForCategories}
        style={{
          height: 400,
          width: 500,
          // maxWidth: 500,
        }}
      />
    </>
  );
};

export default SMIPoids;
