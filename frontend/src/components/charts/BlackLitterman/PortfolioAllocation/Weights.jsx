import React, { memo, useMemo } from "react";
import PieChart from "../../Default/PieChart";

const dd = [
  {
    Symbol: "ADI",
    Weight: 0.71815,
  },
  {
    Symbol: "DWY",
    Weight: 0.28185,
  },
];

const getSeries = (data) => {
  return data
    .map((item) => ({
      value: item.Weight * 100,
      name: item.Symbol,
    }))
    .sort((a, b) => b.value - a.value);
};

const Weights = ({ data }) => {
  const seriesNames = useMemo(() => data.map((item) => item.Symbol), [data]);
  const series = useMemo(() => getSeries(data), [data]);
  const options = useMemo(() => {
    return {
      title: {
        text: "Weights",
        left: "center",
      },
      grid: {
        top: "0%",
      },
      seriesNames: { seriesList: seriesNames },
      series: [
        {
          name: "",
          type: "pie",
          data: series,
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
  }, [seriesNames, series]);
  return (
    <>
      <PieChart
        options={options}
        style={{
          height: 600,
          width: "100%",
          // maxWidth: 800,
          margin: "25px 0 35px",
        }}
        showSeriesSelector
      />
    </>
  );
};

export default memo(Weights);
