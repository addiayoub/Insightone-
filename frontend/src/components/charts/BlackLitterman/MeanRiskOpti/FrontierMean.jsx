import React, { memo, useMemo } from "react";
import ScatterChart from "../../Default/ScatterChart";

const dd = {
  index: "ADH",
  MV: 0.025397152223357713,
  MAD: 0.03274858315898067,
  MSV: 0.009019936809119975,
  FLPM: 1.1874821332310482e-9,
  SLPM: 0.0027927060352975503,
  CVaR: 0.005627737972095971,
  EVaR: 0.013200434830592587,
  WR: 0.013200452471502864,
  MDD: 0.012171692421535115,
  ADD: 0.004334717791938991,
  CDaR: 0.013099976455411893,
  UCI: 0.014169507448308765,
  EDaR: 0.01217166927109138,
};

const formatData = (xData, yData) => {
  return yData.map((item) => [
    xData[item.index] * 100,
    item.MV * 100,
    item.index,
  ]);
};

const getSeriesData = (xData, yData) => {
  const data = formatData(xData, yData);
  return data.map(([x, y, name], index) => ({
    type: "scatter",
    symbol: "circle",
    symbolSize: 20,
    data: [[x, y, name]],
    z: 0,
  }));
};

const FrontierMean = ({ xAxisData, yAxisData }) => {
  console.log("xAxisData", xAxisData);
  console.log("yAxisData", yAxisData);
  const seriesNames = useMemo(() => Object.keys(xAxisData), [xAxisData]);
  const series = useMemo(
    () => getSeriesData(xAxisData, yAxisData),
    [xAxisData, yAxisData]
  );
  console.log("series", series);
  const options = useMemo(() => {
    return {
      title: {
        text: "Portfolio Returns Vs. Risk",
        left: "center",
        top: 0,
      },
      tooltip: {
        formatter: function (params) {
          const { value } = params;
          return `
          <strong>${value[2]}</strong>
          <br />
          MV: ${value[1].toFixed(2)} %<br /> MU: ${value[0].toFixed(2)} %
          `;
        },
      },
      xAxis: {
        name: "MU",
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          formatter: (value) => value?.toFixed(2) + "%",
        },
      },
      yAxis: {
        name: "MV",
        min: "dataMin",
        axisLabel: {
          formatter: (value) => value?.toFixed(2) + "%",
        },
      },
      visualMap: {
        // min: Math.min(...visualMap),
        // max: Math.max(...visualMap),
        dimension: 1,
        orient: "vertical",
        right: 0,
        top: "center",
        calculable: true,
        inRange: {
          // color: ["#f2c31a", "#24b7f2"],
          color: ["#ee4658", "#444ce7"],
        },
        label: {
          show: false,
        },
      },
      series,
    };
  }, [series]);
  return <ScatterChart options={options} style={{ minHeight: 500 }} />;
};

export default memo(FrontierMean);
