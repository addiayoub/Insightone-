import React, { useMemo, useRef } from "react";
import PieChart from "../Default/PieChart";

const PoidsDonut = ({ data, title, field }) => {
  const seriesData = data.map((item) => ({
    name: item.titre,
    value: item[field],
  }));
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
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
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
