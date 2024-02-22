export const calculateChartHeight = (array) => {
  let height = "300px";
  if (array.length > 30) {
    height = "1200px";
  } else if (array.length > 10) {
    height = "500px";
  }
  return height;
};
export const transformCorrelationDataForHeatmap = (data, companies) => {
  const heatmapData = companies
    .map((company1, rowIndex) => {
      return companies.map((company2, colIndex) => {
        return [colIndex, rowIndex, +data[rowIndex][company2].toFixed(2)];
      });
    })
    .flat();

  return heatmapData;
};
