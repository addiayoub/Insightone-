import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const obj = {
  taux_13S: 0.0298,
  Taux_5A: 0.035360692102928123,
  taux_26S: 0.029939285714285713,
  Taux_25A: 0.0486351842503786,
  Taux_15A: 0.04216059654631083,
  Taux_2A: 0.03267582417582418,
  taux_52S: 0.030903448607710344,
  Taux_1A: 0.031376675712846025,
  Taux_30A: 0.05158480565371025,
  date_complete: "2023-12-29",
  Taux_20A: 0.045683947501261986,
  Taux_10A: 0.038659974259974264,
};

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
const seriesNames = [
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
const TauxSec = ({ data }) => {
  data = data[data.length - 1];
  console.log("Insuffisance", data);
  console.log("seriesNames", seriesNames);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution des taux secondaires",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value ?? 0),
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: seriesNames.map((serieName) => seriesNamesRef[serieName].ref),
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
          data: seriesNames.map((serieName) => data[serieName]),
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
  }, [data, seriesNames]);
  return (
    <>
      <BarChart options={options} />
    </>
  );
};

export default memo(TauxSec);
