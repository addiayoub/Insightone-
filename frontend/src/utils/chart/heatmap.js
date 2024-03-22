export const calculateChartHeight = (array) => {
  let height = "300px";
  if (array.length > 30) {
    height = "1200px";
  } else if (array.length > 10) {
    height = "500px";
  }
  return height;
};
export const transformCorrelationDataForHeatmap = (
  data,
  companies,
  withPerc = false
) => {
  const heatmapData = companies
    .map((company1, rowIndex) => {
      return companies.map((company2, colIndex) => {
        const value = withPerc
          ? data[rowIndex][company2] * 100
          : data[rowIndex][company2];
        return [colIndex, rowIndex, parseFloat(value.toFixed(2))];
      });
    })
    .flat();

  return heatmapData;
};
