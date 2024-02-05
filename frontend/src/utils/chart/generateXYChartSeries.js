import moment from "moment";

const generateXYChartSeries = (data, yAxis, xAxis = "SEANCE") => {
  return Object.entries(data).map(([key, items]) => ({
    name: key,
    type: "line",
    symbol: "none",
    data: items.map((item) => [moment(item[xAxis]).valueOf(), item[yAxis]]),
    showSymbol: false,
  }));
};
export default generateXYChartSeries;
