export const getViewPosition = (data, field) => {
  const values = data.map((item) => item[field]);
  const uniqueValues = [...new Set(values)];
  console.log("view unique values", uniqueValues);
  return uniqueValues;
};
