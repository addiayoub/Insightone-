import React from "react";
import ReactECharts from "echarts-for-react";

const transformDataForTreeMap = (data) => {
  const treemapData = [];
  data.forEach((item) => {
    const secteurIndex = treemapData.findIndex(
      (entry) => entry.name === item.SECTEUR_ACTIVITE
    );
    const { TICKER, SECTEUR_ACTIVITE } = item;
    console.log(item);
    const value = [
      item["Contrib PTF rebalancé"] * 100,
      item["Contrib PTF non rebalancé"] * 100,
      item["Contribution rebalancement"] * 100,
    ];
    if (secteurIndex === -1) {
      // If the SECTEUR_ACTIVITE does not exist, create a new entry
      treemapData.push({
        name: SECTEUR_ACTIVITE,
        children: [
          {
            name: TICKER,
            value,
          },
        ],
      });
    } else {
      // If the SECTEUR_ACTIVITE already exists, add a new child
      treemapData[secteurIndex].children.push({
        name: TICKER,
        value,
      });
    }
  });
  console.log("treemapData", treemapData);
  return treemapData;
};

const Treemap = ({ data }) => {
  const options = {
    tooltip: {
      formatter: (params) => {
        const { value, name, treeAncestors } = params;
        if (name !== "ALL") {
          return `
        <div>
          <strong>${treeAncestors[1]?.name} - ${name}: </strong> <br>
          ${value[0]?.toFixed(4)}% Contrib PTF rebalancé<br>
          ${value[1]?.toFixed(4)}% Contrib PTF non rebalancé<br>
          ${value[2]?.toFixed(4)}% Contribution rebalancement
        </div>
        `;
        }
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
        levels: [
          {
            itemStyle: {
              gapWidth: 5,
            },
          },
          {
            // color: [upColor, downColor, "#aaa"],
            // colorMappingBy: "value",
            // visibleMin: -Infinity,
            // visibleMax: Infinity,
          },
        ],
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
