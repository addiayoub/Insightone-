import React, { memo, useMemo } from "react";
import moment from "moment";
import { generateRandomColorsArray } from "../../../../utils/generateRandomColorsArray";
import LineChart from "../../Default/LineChart";
const dd = {
  ADH: 3.3329462365975825e-10,
  ALM: 0.031569415321060355,
  ATW: 0.04127413825442435,
  BAL: 0.09313502498797958,
  BCI: 1.4441745575073773e-9,
  BOA: 0.04671218430875574,
  BCP: 2.33245424005837e-9,
  CDM: 0.08271477471614891,
  CIH: 0.06415029643360168,
  CSR: 1.2977126293703702e-9,
  DWY: 0.08222696097101698,
  EQD: 0.022713699323874747,
  GAZ: 0.01799434256087732,
  HPS: 0.027505835394592722,
  IAM: 0.0017777691412993043,
  LES: 0.04048073635100165,
  SAH: 0.0711369323890847,
  SBM: 2.4966941458136237e-9,
  SMI: 0.04523772734796558,
  UMR: 0.33137015459398617,
};

const getSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => {
    return {
      name: serieName,
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      symbol: "none",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      data: data.map((item) => item[serieName] * 100),
      // .filter((item) => item > 0.01 * 100),
    };
  });
};

const Frontier = ({ data }) => {
  const seriesNames = useMemo(() => Object.keys(data[0]), [data]);
  const colors = useMemo(
    () => generateRandomColorsArray(seriesNames.length),
    [seriesNames.length]
  );
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );
  console.log("colors", colors);
  const options = useMemo(() => {
    return {
      color: colors,
      title: {
        text: "Frontier",
        x: "center",
      },
      grid: {
        right: "100px",
      },
      yAxis: {
        axisLabel: {
          formatter: (value) => value + "%",
        },
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2) + "%",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
      },
      seriesNames: { seriesList: seriesNames },
      series,
    };
  }, [seriesNames, series, colors]);
  return (
    <LineChart
      options={options}
      style={{
        height: "500px",
        maxHeight: "600px",
        margin: "15px 0",
      }}
      showSeriesSelector
      saveToExcel={{ show: true, data, fileName: "Frontier" }}
    />
  );
};

export default memo(Frontier);
