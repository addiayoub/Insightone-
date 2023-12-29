export const transformBacktestData = (ptfs) => {
  const newData = [];
  ptfs.forEach((ptf) => {
    const ptfData = ptf.data;
    const { field } = ptf;
    const dd = ptfData.map((item) => ({
      valeur: item.titre,
      [field]: item[field],
    }));
    newData.push(...dd);
  });
  return mergeDataByKey(newData, "valeur");
};
const mergeDataByKey = (data, key) => {
  const result = data.reduce((acc, item) => {
    const existingItem = acc.find((accItem) => accItem[key] === item[key]);

    if (existingItem) {
      // Merge the values of other keys
      Object.keys(item).forEach((itemKey) => {
        if (itemKey !== key) {
          existingItem[itemKey] = existingItem[itemKey] || 0;
          existingItem[itemKey] += item[itemKey];
        }
      });
    } else {
      // Add a new item to the result array
      acc.push({ ...item });
    }

    return acc;
  }, []);

  return result;
};
