import ReactECharts from "echarts-for-react";
import React from "react";
import testData from "../Test/porteData.json";
import groupBy from "../../utils/groupBy";

function PortefeuilleSunburst({ data, field }) {
  const test = groupBy(data, "SECTEUR_ACTIVITE");
  console.log(test);
  const series = [];
  for (const key in test) {
    const i = { name: key, children: [] };
    for (let index = 0; index < test[key].length; index++) {
      const item = test[key][index];
      if (item[field] > 0.01) {
        i.children.push({
          name: item.titre,
          value: item[field],
          itemStyle: {
            padding: 700,
          },
        });
      }
    }
    series.push(i);
  }
  console.log(series);
  const options = {
    title: {
      text: "",
    },
    grid: {
      left: "100%",
    },
    series: {
      type: "sunburst",
      data: series,
      radius: [0, "95%"],
      label: {
        show: false, // Initially hide labels
        formatter: function (params) {
          return `${params.name}: ${params.value.toFixed(2)}%`;
        },
        emphasis: {
          show: true,
          fontWeight: "bold", // Show labels on hover
        },
      },
      sort: undefined,
      emphasis: {
        focus: "ancestor",
        // show: true,
        // fontWeight: "bold", // Show labels on hover
      },
      levels: [
        {},
        {
          r0: "0%",
          r: "65%",
          itemStyle: {
            borderWidth: 2,
          },
          label: {
            fontSize: 8,
            align: "center",
            rotate: "tangential",
          },
        },
        {
          r0: "65%",
          r: "100%",
          label: {
            align: "center",
            fontSize: 8,
            rotate: "tangential",
          },
        },
      ],
    },
  };
  return (
    <ReactECharts
      option={options}
      // opts={{ renderer: "svg" }}
      style={{
        height: "500px",
      }}
    />
  );
}

export default PortefeuilleSunburst;
