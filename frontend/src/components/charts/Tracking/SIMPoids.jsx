import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import useChartTheme from "../../../hooks/useChartTheme";
import generateCategorieSeries, {
  generateClassSeries,
  generateGroupeSeries,
} from "../../../utils/generateCategorieSeries";
import { Box } from "@mui/material";
import NominalPoids from "../../NominalPoids";
("../Default/PieChart");
import PieChart from "../Default/PieChart";
import GridContainer, { GridItem } from "../../Ui/GridContainer";

const generateOptions = (seriesNames, seriesData, title) => {
  return {
    title: {
      text: title,
      left: "center",
    },
    grid: {
      top: "0%",
    },
    seriesNames: { seriesList: seriesNames, init: seriesNames },
    series: [
      {
        name: "",
        type: "pie",
        data: seriesData,
        radius: ["10%", "70%"],
        // radius: "50%",
        avoidLabelOverlap: false,
        label: {
          // alignTo: "edge",
          show: true,
          formatter: function (params) {
            let name = params.name;
            const { value } = params;
            if (name.length > 5) {
              const newName = name.split(" ");

              name = newName.join(" \n");
            }
            return `${name}:${value.toFixed(2)}%`;
          },
          fontSize: 9,
          minMargin: 6,
          edgeDistance: 10,
          lineHeight: 15,
        },
        labelLine: {
          length: 10,
          length2: 0,
          maxSurfaceAngle: 500,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
        // .filter((ele) => ele[SIM] > 0.001)
        .map((item) => ({
          value: item[SIM] * 100,
          name: item.titre,
        }))
        .sort((a, b) => b.value - a.value),
    [df_poids, SIM]
  );
  console.log("sere is ", seriesData);
  const seriesNames = useMemo(
    () => seriesData.map((serie) => serie.name),
    [seriesData]
  );

  const categorieSeries = useMemo(
    () => generateCategorieSeries(seriesData),
    [seriesData]
  );
  const categorieSeriesNames = useMemo(
    () => categorieSeries.map((serie) => serie.name),
    [categorieSeries]
  );

  const groupeSeries = useMemo(
    () => generateGroupeSeries(seriesData),
    [seriesData]
  );
  const groupeSeriesNames = useMemo(
    () => groupeSeries.map((serie) => serie.name),
    [groupeSeries]
  );

  const classeSeries = useMemo(
    () => generateClassSeries(seriesData),
    [seriesData]
  );
  const classeSeriesNames = useMemo(
    () => groupeSeries.map((serie) => serie.name),
    [classeSeries]
  );

  console.log(
    "SIM POIDS",
    seriesData.filter((serie) => serie.value > 0),
    "categorieSeries",
    categorieSeries,
    categorieSeriesNames
  );

  const options = useMemo(() => {
    const series = seriesData.filter((serie) => serie.value > 0.001);
    return generateOptions(seriesNames, series, "Titres");
  }, [theme, seriesData, seriesNames, SIM]);

  const optionsForCategories = useMemo(
    () =>
      generateOptions(
        categorieSeriesNames,
        categorieSeries,
        "Secteurs d'activités"
      ),
    [categorieSeriesNames, categorieSeries, SIM, theme]
  );
  const optionsForGroupes = useMemo(
    () => generateOptions(groupeSeriesNames, groupeSeries, "Groupes"),
    [groupeSeriesNames, groupeSeries, SIM, theme]
  );
  const optionsForClasses = useMemo(
    () => generateOptions(classeSeriesNames, classeSeries, "Classes"),
    [classeSeriesNames, classeSeries, SIM, theme]
  );
  console.log("options", optionsForCategories);
  return (
    <>
      <GridContainer>
        <GridItem>
          <PieChart
            options={optionsForGroupes}
            style={{
              height: 600,
            }}
            showSeriesSelector
          />
        </GridItem>
        <GridItem>
          <PieChart
            options={optionsForClasses}
            style={{
              height: 600,
            }}
            showSeriesSelector
          />
        </GridItem>
      </GridContainer>
      <Box className="flex flex-wrap justify-center gap-8">
        <NominalPoids data={seriesData} />
        {/* <GridContainer extraCss="gap-4 mt-[80px]"> */}
        {/* <SeriesSelector /> */}
        {/* <SeriesSelector2 /> */}
        {/* <GridItem> */}
        {/* <ReactECharts
        ref={chart1Ref}
        option={optionsForCategories}
        style={{
          height: 600,
          width: "100%",
          maxWidth: 800,
        }}
      /> */}

        <PieChart
          options={optionsForCategories}
          style={{
            height: 600,
            width: "100%",
            maxWidth: 800,
          }}
          showSeriesSelector
        />
        {/* </GridItem> */}
        {/* <GridItem> */}
        {/* <ReactECharts
        ref={chart2Ref}
        option={options}
        style={{
          height: 600,
          width: "100%",
          maxWidth: 800,
        }}
      /> */}
        <PieChart
          options={options}
          style={{
            height: 600,
            width: "100%",
            maxWidth: 800,
          }}
          showSeriesSelector
        />
        {/* </GridItem> */}
        {/* </GridContainer> */}
      </Box>
    </>
  );
};

export default SIMPoids;
