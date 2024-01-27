import React from "react";
import ReactECharts from "echarts-for-react";
import useChartTheme from "../../hooks/useChartTheme";
import titreByCat from "../../data/titreByCat.json";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { Box } from "@mui/material";

const calculateClassePercentage = (selectedData) => {
  // Calculate the percentage for each unique classe
  const classeCounts = {};
  selectedData.forEach((item) => {
    classeCounts[item.classe] = (classeCounts[item.classe] || 0) + 1;
  });

  const classePercentageData = Object.entries(classeCounts).map(
    ([classe, count]) => ({
      name: classe,
      value: (count / selectedData.length) * 100,
    })
  );

  return classePercentageData;
};

const calculateCategoriePercentage = (selectedData) => {
  // Calculate the percentage for each unique categorie
  const categorieCounts = {};
  selectedData.forEach((item) => {
    categorieCounts[item.categorie] =
      (categorieCounts[item.categorie] || 0) + 1;
  });

  const categoriePercentageData = Object.entries(categorieCounts).map(
    ([categorie, count]) => ({
      name: categorie,
      value: (count / selectedData.length) * 100,
    })
  );
  return categoriePercentageData;
};

const createOptions = (name, seriesData) => {
  seriesData.sort((a, b) => b.value - a.value);
  return {
    title: {
      text: `${name}s`,
      left: "center",
    },
    grid: {
      bottom: "0%",
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      confine: true,
      valueFormatter: (value) => value?.toFixed(2) + "%",
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      zLevel: 23,
      width: "60%",
      left: "center",
      bottom: "3%",
    },
    series: [
      {
        name,
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
            fontSize: 20,
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

const SelectedTitres = ({ selectedTitres = [], type = "Actions" }) => {
  const referenceData = titreByCat[type];
  const selectedData = referenceData.filter((item) =>
    selectedTitres.includes(item.libelle)
  );
  const classeData = calculateClassePercentage(selectedData);
  const categriesData = calculateCategoriePercentage(selectedData);
  console.log("selectedData", selectedData, "classeData", classeData);
  const titresData = selectedTitres.map((item) => ({
    value: 100 / selectedTitres.length,
    name: item,
  }));
  const titreChart = createOptions("Titre", titresData);
  const categorieChart = createOptions("Catégorie", categriesData);
  console.log("categriesData", categriesData);
  const classeChart = createOptions("Classe", classeData);
  return (
    <Box className="py-2">
      <h2 className="text-center underline decoration-[var(--primary-color)] my-2">
        {type}
      </h2>
      <GridContainer>
        <GridItem cols={4}>
          <ReactECharts
            option={classeChart}
            style={{
              height: "350px",
              maxHeight: "500px",
              margin: "15px 0",
            }}
          />
        </GridItem>
        <GridItem cols={4}>
          <ReactECharts
            option={categorieChart}
            style={{
              height: "350px",
              maxHeight: "500px",
              margin: "15px 0",
            }}
          />
        </GridItem>
        <GridItem cols={4}>
          <ReactECharts
            option={titreChart}
            style={{
              height: "350px",
              maxHeight: "500px",
              margin: "15px 0",
            }}
          />
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default SelectedTitres;
