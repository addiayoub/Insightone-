import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import { downColor, upColor } from "../../../utils/generateRandomColorsArray";

const seriesNamesRef = {
  taux_13S: {
    ref: "13s",
    order: 1,
  },
  taux_26S: {
    ref: "26s",
    order: 2,
  },
  taux_52S: {
    ref: "52s",
    order: 3,
  },
  Taux_1A: {
    ref: "1ans",
    order: 4,
  },
  Taux_2A: {
    ref: "2ans",
    order: 5,
  },
  Taux_5A: {
    ref: "5ans",
    order: 6,
  },
  Taux_10A: {
    ref: "10ans",
    order: 7,
  },
  Taux_15A: {
    ref: "15ans",
    order: 8,
  },
  Taux_20A: {
    ref: "20ans",
    order: 9,
  },
  Taux_25A: {
    ref: "25ans",
    order: 10,
  },
  Taux_30A: {
    ref: "30ans",
    order: 11,
  },
};
const basedSeriesNames = [
  "taux_13S",
  "taux_26S",
  "taux_52S",
  "Taux_1A",
  "Taux_2A",
  "Taux_5A",
  "Taux_10A",
  "Taux_15A",
  "Taux_20A",
  "Taux_25A",
  "Taux_30A",
];

const formatData = (data) => {
  // data is desc by date
  if (data.length > 1) {
    const difference = {};
    const obj1 = data[0];
    const obj2 = data[1];
    basedSeriesNames.forEach((serieName) => {
      difference[serieName] = obj1[serieName] - obj2[serieName];
    });
    return difference;
  }
  return data[data.length - 1];
};

const getSeries = (data) => {
  data = formatData(data);
  console.log("getSeries data", data);
  const seriesData = basedSeriesNames.map((serieName) => {
    const value = parseFloat((data[serieName] * 100).toFixed(2));
    return {
      value,
      itemStyle: {
        color: value >= 0 ? "#22c55e" : "#ef4444",
      },
    };
  });
  const seriesNames = basedSeriesNames.map(
    (serieName) => seriesNamesRef[serieName].ref
  );
  return { seriesNames, seriesData };
};

const TauxSec = ({ data }) => {
  console.log("Insuffisance data", data, formatData(data));
  console.log("basedSeriesNames", basedSeriesNames);
  const { seriesData, seriesNames } = useMemo(() => getSeries(data), [data]);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution des taux secondaires",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value ?? 0) + "%",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: seriesNames,
        axisLine: {
          show: true,
        },
      },
      yAxis: {
        axisLabel: {
          show: false,
        },
      },
      toolbox: {
        top: "0",
      },
      series: [
        {
          type: "bar",
          data: seriesData,
          label: {
            show: true,
            position: "top",
            formatter: function (params) {
              return params.value.toFixed(2);
            },
          },
        },
      ],
    };
  }, [seriesData, seriesNames]);
  return (
    <>
      <BarChart
        options={options}
        saveToExcel={{
          show: true,
          data: [data],
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default memo(TauxSec);
