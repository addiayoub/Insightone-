import React, { memo, useMemo } from "react";
import BarChart from "../Default/BarChart";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";
import moment from "moment";

const arr = [
  {
    taux_13S: 0.0288,
    Taux_5A: 0.035454564084234905,
    taux_26S: 0.0298,
    Taux_15A: 0.04367043271715128,
    Taux_2A: 0.03320186335403727,
    taux_52S: 0.03178721945812827,
    Taux_30A: 0.05386964702213054,
    date_complete: "2023-12-25",
    Taux_20A: 0.04801949424554277,
    Taux_10A: 0.04026213101969062,
  },
  {
    taux_13S: 0.028300000000000002,
    Taux_5A: 0.03421204496981887,
    taux_26S: 0.0287,
    Taux_15A: 0.04067630042826905,
    Taux_2A: 0.03338496392581648,
    taux_52S: 0.03251842548244403,
    Taux_30A: 0.05144388492765603,
    date_complete: "2024-02-05",
    Taux_20A: 0.04292829551349875,
    Taux_10A: 0.037593464067577964,
  },
];
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
const getSeriesData = (data, seriesNames) => {
  const based = seriesNames
    .map((serieName) => {
      console.log({ serieName, value: data[serieName] * 100 });
      return {
        serieName: seriesNamesRef[serieName].ref,
        value: data[serieName] * 100,
      };
    })
    .filter((item) => !isNaN(item.value));

  return {
    seriesNames: based.map((item) => item.serieName),
    seriesData: based.map((item) => item.value),
  };
};

const CourbeTaux = ({ data, title, isPrimaire }) => {
  const primaryData = data[data.length - 1];
  console.log("primaryData", primaryData);
  const secondaryData = data[0] ?? [];
  const { seriesNames, seriesData } = useMemo(
    () => getSeriesData(primaryData, basedSeriesNames),
    [primaryData, basedSeriesNames]
  );
  const { seriesNames: seriesNames2, seriesData: seriesData2 } = useMemo(
    () => getSeriesData(secondaryData, basedSeriesNames),
    [secondaryData, basedSeriesNames]
  );

  console.log("seriesNames", seriesNames, seriesData);
  const options = useMemo(() => {
    return {
      title: {
        text: title,
        left: "10%",
        top: "0",
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
        min: Math.min(...seriesData),
      },
      toolbox: {
        top: "5px",
      },
      series: [
        {
          name: `${isPrimaire ? "Primaire" : "Secondaire"} du ${moment(
            primaryData.date_complete
          ).format("DD/MM/YYYY")}`,
          type: "line",
          data: seriesData,
          smooth: true,
          symbol: "none",
        },
        {
          name: `${moment(secondaryData.date_complete).format("DD/MM/YYYY")}`,
          type: "line",
          data: seriesData2,
          smooth: true,
          symbol: "none",
          lineStyle: {
            type: "dashed",
          },
        },
      ],
    };
  }, [data, seriesNames]);
  return (
    <>
      <BarChart
        options={options}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
      />
    </>
  );
};

export default CourbeTaux;
