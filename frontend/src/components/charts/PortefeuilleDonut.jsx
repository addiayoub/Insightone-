import React from "react";

import PieChart from "./Default/PieChart";

const getSeries = (data, field) => {
  let seriesData = [];
  data.forEach((item) => {
    seriesData.push({
      value: item[field],
      name: item.titre,
    });
  });
  return seriesData;
};

function PortefeuilleDonut({ data, field }) {
  const seriesData = useMemo(() => getSeries(data, field), [data, field]);
  const options = {
    grid: {
      left: "10%",
      top: "30%",
      right: "10%",
      bottom: "15%",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["0%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
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
  return (
    <>
      {/* <ReactECharts
        option={options}
        style={{
          height: data.length < 8 ? "300px" : "500px",
          maxHeight: "600px",
          maxWidth: "500px",
        }}
      /> */}
      <PieChart
        options={options}
        style={{
          height: data.length < 8 ? "300px" : "500px",
          maxHeight: "600px",
          maxWidth: "500px",
        }}
      />
    </>
  );
}

export default PortefeuilleDonut;
