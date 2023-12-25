import moment from "moment";
import React, { memo, useMemo } from "react";
import DarkChart from "./DarkChart";
import formatIndicesChartData from "../../utils/formatIndicesChartData";

function ComparaisonIndices({ data }) {
  const seriesData = useMemo(
    () => formatIndicesChartData(data, "COTATION_B100"),
    [data]
  );
  const options = useMemo(() => {
    return {
      chart: {
        type: "line",
        height: 600,
      },
      title: {
        text: "Comparaison des indices",
      },
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            return moment(this.value).format("DD-MM-YYYY");
          },
        },
      },
      yAxis: {
        title: {
          text: "COTATION_B100",
        },
      },
      series: seriesData,
      tooltip: {
        shared: true,
        crosshairs: true,
        xDateFormat: "%d/%m/%Y",
      },
      accessibility: { enabled: false },
      navigator: {
        enabled: true,
        height: 15,
        xAxis: {
          labels: {
            enabled: false,
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
              maxHeight: 400,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    };
  }, [seriesData]);
  return <DarkChart options={options} />;
}

export default memo(ComparaisonIndices);
