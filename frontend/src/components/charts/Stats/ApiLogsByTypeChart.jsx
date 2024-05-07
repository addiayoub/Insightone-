import React, { memo, useMemo } from "react";
import PieChart from "../Default/PieChart";
const dd = {
  FASTAPICount: 30,
  GETAPICount: 11,
};
const ApiLogsByTypeChart = ({ data }) => {
  const option = useMemo(() => {
    return {
      title: {
        text: "Nombre d'appels API par type",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      series: [
        {
          name: "API Count",
          avoidLabelOverlap: false,
          type: "pie",
          radius: "70%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          data: Object.entries(data).map(([name, value]) => ({ value, name })),
        },
      ],
    };
  }, [data]);

  return (
    <PieChart
      options={option}
      style={{
        height: "400px",
        width: "100%",
        maxWidth: "600px",
        margin: "10px auto",
      }}
    />
  );
};

export default memo(ApiLogsByTypeChart);
