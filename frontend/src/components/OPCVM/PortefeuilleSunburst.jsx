import ReactECharts from "echarts-for-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import groupBy from "../../utils/groupBy";
import { ToggleLeft, ToggleRight } from "react-feather";
import { IconButton } from "@mui/material";
import { getFullscreenFeature } from "../../utils/chart/defaultOptions";
import { generateSeries } from "../../utils/generateCategorieSeries";
import PieChart from "../charts/Default/PieChart";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const societeFirstFun = (data) => {
  const res = [];
  const societeGestionMap = {};

  for (const classification in data) {
    for (const item of data[classification]) {
      const { Societe_Gestion, titre } = item;

      if (!societeGestionMap[Societe_Gestion]) {
        societeGestionMap[Societe_Gestion] = {
          name: Societe_Gestion,
          children: [],
        };
        res.push(societeGestionMap[Societe_Gestion]);
      }

      const classificationNode = societeGestionMap[Societe_Gestion];

      if (!classificationNode[classification]) {
        classificationNode[classification] = {
          name: classification,
          children: [],
        };
        societeGestionMap[Societe_Gestion].children.push(
          classificationNode[classification]
        );
      }

      classificationNode[classification].children.push({
        name: titre,
        value: item[field],
        itemStyle: {
          padding: 700,
        },
      });
    }
  }
  return res;
};
const classiFirstFun = (data) => {
  const res = [];
  for (const classification in data) {
    const classificationNode = {
      name: classification,
      children: [],
    };

    const societeGestionMap = {};

    for (const item of data[classification]) {
      const { Societe_Gestion, titre } = item;
      if (!societeGestionMap[Societe_Gestion]) {
        societeGestionMap[Societe_Gestion] = {
          name: Societe_Gestion,
          children: [],
        };
        classificationNode.children.push(societeGestionMap[Societe_Gestion]);
      }

      societeGestionMap[Societe_Gestion].children.push({
        name: titre,
        value: item[field],
        itemStyle: {
          padding: 700,
        },
      });
    }

    res.push(classificationNode);
  }
  return res;
};

const createOptions = (seriesData) => {
  return {
    series: [
      {
        name: "",
        type: "pie",
        data: seriesData,
        radius: ["47%", "70%"],
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

function PortefeuilleSunburst({ data, field }) {
  console.log("PortefeuilleSunburst data", data);
  console.log("render PortefeuilleSunburst", generateSeries(data, field));
  const classiSeries = generateSeries(data, field);
  const sgSeries = generateSeries(data, field, "Societe_Gestion");
  const sgOpts = createOptions(sgSeries);
  const classiOpts = createOptions(sgSeries);
  const test = groupBy(data, "Classification");
  const [isClassification, setIsClassification] = useState(false);
  const [series, setSeries] = useState();
  const toggleHierarchy = () => {
    setIsClassification((prevState) => !prevState);
  };
  const chartRef = useRef(null);
  const myFullscreen = getFullscreenFeature(chartRef);
  console.log(test);
  const societeFirst = () => {
    const res = [];
    const societeGestionMap = {};

    for (const classification in test) {
      for (const item of test[classification]) {
        const { Societe_Gestion, titre } = item;

        if (!societeGestionMap[Societe_Gestion]) {
          societeGestionMap[Societe_Gestion] = {
            name: Societe_Gestion,
            children: [],
          };
          res.push(societeGestionMap[Societe_Gestion]);
        }

        const classificationNode = societeGestionMap[Societe_Gestion];

        if (!classificationNode[classification]) {
          classificationNode[classification] = {
            name: classification,
            children: [],
          };
          societeGestionMap[Societe_Gestion].children.push(
            classificationNode[classification]
          );
        }

        classificationNode[classification].children.push({
          name: titre,
          value: item[field],
          itemStyle: {
            padding: 700,
          },
        });
      }
    }
    setSeries(res);
  };
  const classiFirst = () => {
    const res = [];
    for (const classification in test) {
      const classificationNode = {
        name: classification,
        children: [],
      };

      const societeGestionMap = {};

      for (const item of test[classification]) {
        const { Societe_Gestion, titre } = item;
        if (!societeGestionMap[Societe_Gestion]) {
          societeGestionMap[Societe_Gestion] = {
            name: Societe_Gestion,
            children: [],
          };
          classificationNode.children.push(societeGestionMap[Societe_Gestion]);
        }

        societeGestionMap[Societe_Gestion].children.push({
          name: titre,
          value: item[field],
          itemStyle: {
            padding: 700,
          },
        });
      }

      res.push(classificationNode);
    }
    setSeries(res);
  };
  useEffect(() => {
    isClassification ? societeFirst() : classiFirst();
  }, [isClassification]);
  console.log("series", series);
  // for (const classification in test) {
  //   const classificationNode = { name: classification, children: [] };
  //   for (const item of test[classification]) {
  //     const gestionNode = { name: item.Societe_Gestion, children: [] };

  //     gestionNode.children.push({
  //       name: item.titre,
  //       value: item[field],
  //       itemStyle: {
  //         padding: 700,
  //       },
  //     });

  //     classificationNode.children.push(gestionNode);
  //     series.push(classificationNode);
  //   }
  // }
  const options = {
    title: {
      text: "",
    },
    toolbox: {
      feature: {
        myFullscreen,
        saveAsImage: {},
      },
      top: "20px",
    },
    grid: {
      // left: "100%",
    },
    series: {
      type: "sunburst",
      data: series,
      radius: [0, "95%"],
      label: {
        show: false,
        formatter: function (params) {
          return `${params.name}: ${params.value.toFixed(2)}%`;
        },
        emphasis: {
          show: true,
          fontWeight: "bold",
        },
      },
      sort: undefined,
      emphasis: {
        focus: "ancestor",
      },
      levels: [
        {},
        {
          r0: "15%",
          r: "40%",
          itemStyle: {
            fontSize: 8,
            borderWidth: 2,
          },
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: "40%",
          r: "70%",
          label: {
            rotate: "tangential",
          },
          itemStyle: {
            fontSize: 8,
            borderWidth: 2,
          },
        },
        {
          r0: "70%",
          r: "90%",
          label: {
            rotate: "tangential",
            padding: 3,
            silent: false,
          },
          itemStyle: {
            borderWidth: 3,
            fontSize: 8,
          },
        },
      ],
    },
  };
  return (
    <div>
      <PieChart
        options={sgOpts}
        style={{
          maxHeight: "310px",
          height: "310px",
        }}
      />
      <PieChart
        options={classiOpts}
        style={{
          maxHeight: "310px",
          height: "310px",
        }}
      />
      <div className="relative">
        <ReactECharts
          option={options}
          // opts={{ renderer: "svg" }}
          style={{
            height: "500px",
          }}
          ref={chartRef}
        />
        <div className="absolute left-0 text-[10px] top-0 max-w-[100px] mb-5">
          <span>Société de gestion</span>
          <IconButton
            color="primary"
            title="Regrouper par Classification/Société de gestion"
            variant="contained"
            onClick={toggleHierarchy}
          >
            {isClassification ? <ToggleLeft /> : <ToggleRight />}
          </IconButton>
          <span>Classification</span>
        </div>
      </div>
    </div>
  );
}

export default PortefeuilleSunburst;
