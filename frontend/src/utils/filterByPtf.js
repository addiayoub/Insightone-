export const filterByPtf = (data, ptfName, isPtf) => {
  console.log(
    "fill data",
    data,
    ptfName,
    data.filter((item) => item[ptfName] <= 0.01)
  );
  // this case ptfName = field
  data = data
    .filter((item) => item[ptfName] >= 0.01)
    .map((item) => ({
      ...item,
      [ptfName]: ptfName === "Poids_MASI" ? item[ptfName] * 100 : item[ptfName],
    }))
    .sort((a, b) => b[ptfName] - a[ptfName]);
  if (isPtf) {
    const formatData = data.map((item) => {
      const newItem = {
        ...item,
        [ptfName]: item[ptfName],
      };

      // Remove other ptf fields
      Object.keys(item).forEach((key) => {
        if (key.startsWith("ptf") && key !== ptfName) {
          delete newItem[key];
        }
      });

      return newItem;
    });
    console.log("formatData data", formatData);
    return formatData;
  }
  return data;
};
