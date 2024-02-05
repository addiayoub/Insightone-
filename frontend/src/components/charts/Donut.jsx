import React, { useMemo } from "react";
import PieChart from "./Default/PieChart";

const getSeries = (data) => {
  let seriesData = [];
  data.forEach((item) => {
    if (item.marche !== "Marché globale") {
      seriesData.push({
        value: item.perf * 100,
        name: item.marche,
      });
    }
  });
  return seriesData;
};

function Donut({ data }) {
  const seriesData = useMemo(() => getSeries(data), [data]);
  const options = useMemo(() => {
    return {
      series: [
        {
          name: "",
          type: "pie",
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
  }, [seriesData]);
  return (
    <>
      <PieChart options={options} />
    </>
  );
}

export default Donut;
