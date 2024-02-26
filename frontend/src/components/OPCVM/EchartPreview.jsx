import React, { useMemo, useRef } from "react";
import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import LineChart from "../charts/Default/LineChart";

const getSeriesData = (data) => {
  return Object.entries(data).map(([key, items]) => ({
    name: key,
    type: "line",
    data: items.map((item) => [moment(item.Date_VL).valueOf(), item.VL_AJUSTE]),
    symbol: "none",
  }));
};

const EChartsPreview = ({ data }) => {
  const seriesData = useMemo(() => getSeriesData(data), [data]);
  const seriesNames = useMemo(
    () => seriesData.map((item) => item.name),
    [seriesData]
  );
  console.log("seriesNames EchartPre", seriesNames);
  const options = useMemo(() => {
    return {
      title: {
        text: "Evolution du volume des titres sélectionnés",
        left: "left",
      },
      xAxis: {
        type: "time",
        axisLabel: {
          formatter: function (value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      },
      seriesNames: { seriesList: seriesNames },
      yAxis: {
        nameLocation: "middle",
        nameGap: 50,
        name: "Volume Ajuste",
      },
      series: seriesData,
      tooltip: {
        valueFormatter: (value) => formatNumberWithSpaces(value),
        axisPointer: {
          type: "line",
          label: {
            show: false,
            formatter: function (params) {
              return moment(params.value).format("DD-MM-YYYY");
            },
          },
        },
      },
      grid: {
        left: "50px",
        right: "80px",
      },
    };
  }, [seriesData, seriesNames]);

  return (
    // <ReactECharts
    //   option={options}
    //   style={{ minHeight: 500 }}
    //   key={JSON.stringify(options)}
    //   ref={chart}
    // />
    <LineChart
      options={options}
      style={{ minHeight: 500 }}
      // showSeriesSelector
    />
  );
};

export default EChartsPreview;
