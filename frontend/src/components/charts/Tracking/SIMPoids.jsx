import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../../hooks/useChartTheme";
import useSeriesSelector from "../../../hooks/useSeriesSelector";
import generateCategorieSeries from "../../../utils/generateCategorieSeries";
import { Box } from "@mui/material";
import GridContainer, { GridItem } from "../../Ui/GridContainer";
import calculateNominalPoids from "../../../utils/nominalPoids";
import NominalPoids from "../../NominalPoids";
const generateOptions = (seriesNames, seriesData, title, theme) => {
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
      // data: seriesNames,
      type: "scroll",
      orient: "horizontal",
      zLevel: 23,
      width: "60%",
      left: "center",
      bottom: "0",
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

const SIMPoids = ({ SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids, SIM);
  const theme = useChartTheme();
  const seriesData = useMemo(
    () =>
      df_poids
        .filter((ele) => ele[SIM] > 0.001)
        .map((item) => ({
          value: item[SIM] * 100,
          name: item.titre,
        }))
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
    "categorieSeries",
    categorieSeries,
    categorieSeriesNames
  );

  const options = useMemo(
    () => generateOptions(seriesNames, seriesData, "Titres", theme),
    [theme, seriesData, seriesNames, SIM]
  );

  const optionsForCategories = useMemo(
    () =>
      generateOptions(
        categorieSeriesNames,
        categorieSeries,
        "Secteurs d'activités",
        theme
      ),
    [categorieSeriesNames, categorieSeries, SIM, theme]
  );
  console.log("options", optionsForCategories);
  return (
    <Box>
      <NominalPoids data={seriesData} />
      <GridContainer extraCss="gap-4 mt-[80px]">
        {/* <SeriesSelector /> */}

        {/* <SeriesSelector2 /> */}
        <GridItem>
          <ReactECharts
            option={optionsForCategories}
            style={{
              height: 400,
              // width: 500,
              // maxWidth: 500,
            }}
          />
        </GridItem>
        <GridItem>
          <ReactECharts
            option={options}
            style={{
              height: 400,
              // width: 500,
              // maxWidth: 500,
            }}
          />
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default SIMPoids;
