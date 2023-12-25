import React from "react";
import moment from "moment";

const formatIndicesChartData = (data, yAxis) => {
  const seriesData = [];
  for (const key in data) {
    seriesData.push({
      name: key,
      data: data[key].map((item) => [
        moment(item.SEANCE).valueOf(),
        item[yAxis],
      ]),
      marker: { enabled: false },
      showInLegend: true,
    });
  }
  return seriesData;
};

export default formatIndicesChartData;
