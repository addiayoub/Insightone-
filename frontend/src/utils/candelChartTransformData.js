import { formatDate } from "./FormatDate";

export const candelChartTransformData = (
  arrayData,
  seance,
  open,
  close,
  higher,
  lower
) => {
  console.log("array data", arrayData);
  const categoryData = [];
  const values = [];
  arrayData.map((item) => {
    categoryData.push(formatDate(item[seance]));
    values.push([item[open], item[close], item[lower], item[higher]]);
  });
  return { categoryData, values };
};
