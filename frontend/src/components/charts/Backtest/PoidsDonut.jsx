import React, { useMemo } from "react";
import PieChart from "../Default/PieChart";

const calculateSum = (data, field) => {
  const values = data.map((item) => item[field]);
  const sumOfValues = values.reduce((sum, val) => sum + val, 0);
  return sumOfValues;
};

const PoidsDonut = ({ data, title, field }) => {
  const sum = useMemo(() => calculateSum(data, field), [data, field]);
  const seriesData = data.map((item) => ({
    name: item.titre,
    value: field === "poids_final" ? (item[field] / sum) * 100 : item[field],
  }));
  console.log(
    "sum is",
    seriesData.reduce((sum, dataPoint) => sum + dataPoint.value, 0)
  );
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "center",
      },
      grid: {
        bottom: "10%",
      },
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
  }, [seriesData]);
  return (
    <PieChart
      style={{
        minWidth: "360px",
        width: "100%",
      }}
      options={options}
    />
  );
};

export default PoidsDonut;
