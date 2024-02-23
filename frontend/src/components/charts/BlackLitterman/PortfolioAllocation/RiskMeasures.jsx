import React, { memo, useMemo } from "react";
import BarChart from "../../Default/BarChart";
const getSeries = (data, seriesNames) => {
  return seriesNames.map((key) => ({
    name: key,
    type: "bar",
    data: data.map((item) => item[key] * 100),
  }));
};
const dd = {
  index: "BCI",
  MV: 8.453354192163286e-9,
  MAD: 4.4777454780315413e-10,
  MSV: 3.1001347032766896e-8,
  FLPM: 4.488381617501468e-8,
  SLPM: 8.982153888342903e-9,
  CVaR: 1.93291955533976e-9,
  EVaR: 2.6916569674315775e-9,
  WR: 2.3704472245933946e-10,
  MDD: 0.01586137971782455,
  ADD: 4.875094259895514e-10,
  CDaR: 1.3811929095957961e-9,
  UCI: 2.607102936262812e-8,
  EDaR: 0.013018788258217987,
};
const RiskMeasures = ({ data }) => {
  const seriesNames = useMemo(() =>
    Object.keys(data[0]).filter((key) => key !== "index")
  );
  const xAxisData = useMemo(() => data.map((item) => item.index), [data]);
  const series = useMemo(
    () => getSeries(data, seriesNames),
    [data, seriesNames]
  );

  const options = useMemo(() => {
    return {
      title: {
        text: "Risk Measures",
        left: "center",
      },
      tooltip: {
        valueFormatter: (value) => value?.toFixed(2),
      },
      legend: {
        data: seriesNames,
        left: "center",
        bottom: "9%",
      },
      grid: {
        right: "5%",
        top: "50px",
        bottom: "15%",
      },
      showDataZoom: true,
      xAxis: {
        type: "category",
        data: xAxisData,
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
      },
      seriesNames: { seriesList: seriesNames },
      series: series,
    };
  }, [series, seriesNames]);
  return (
    <>
      <BarChart
        options={options}
        style={{
          minHeight: "510px",
          margin: "15px 0",
        }}
        saveToExcel={{
          show: true,
          data,
          fileName: options.title.text,
        }}
        showSeriesSelector
      />
    </>
  );
};

export default memo(RiskMeasures);
