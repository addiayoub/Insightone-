import React from "react";
import ReactECharts from "echarts-for-react";
const upColor = "#ec0000";
const downColor = "#00da3c";

const defineColor = (value) => {
  let color = "#aaa";
  if (value > 0) {
    color = upColor;
  }
  if (value < 0) {
    color = downColor;
  }
  console.log("color is", color);
  return color;
};
const transformDataForTreeMap = (data) => {
  const resultMap = {};

  data.forEach((item) => {
    const parentKey = item.SECTEUR_ACTIVITE;
    const childKey = item.TICKER;
    const value = item["Contrib PTF rebalancé"] * 100;
    // const color = defineColor(value);

    if (!resultMap[parentKey]) {
      resultMap[parentKey] = { name: parentKey, children: [] };
    }

    resultMap[parentKey].children.push({
      name: childKey,
      value,
      // itemStyle: {
      //   color: defineColor(value),
      // },
    });
  });

  return Object.values(resultMap);
};

const Treemap = ({ data }) => {
  console.log("Tree mapa data", data);
  const options = {
    tooltip: {
      formatter: (params) => {
        const { value, name } = params;
        return `
        <div>
          <strong>${name}: </strong> ${value.toFixed(2)}%
        </div>
        `;
        console.log(params);
      },
    },
    series: [
      {
        name: "ALL",
        bottom: 0,
        roam: false,
        type: "treemap",
        label: {
          show: true,
          formatter: "{b}",
        },
        itemStyle: {
          borderColor: "green",
        },
        visualMin: -100,
        visualMax: 100,
        visualDimension: 3,
        data: transformDataForTreeMap(data),
      },
    ],
  };
  return (
    <ReactECharts
      option={options}
      style={{
        height: "500px",
        maxHeight: "600px",
      }}
    />
  );
};

export default Treemap;
