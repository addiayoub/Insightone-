const mergeDataByKeyBeta = (data, key) => {
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
      // Create a new item with all keys and set missing keys to 0
      const newItem = {};
      data.forEach((obj) => {
        Object.keys(obj).forEach((objKey) => {
          newItem[objKey] = 0;
        });
      });

      // Set the values of the current item
      Object.keys(item).forEach((itemKey) => {
        newItem[itemKey] = item[itemKey];
      });

      // Add the new item to the result array
      acc.push(newItem);
    }

    return acc;
  }, []);
  console.log("merge beta", result);
  return result;
};

export const transformBacktestData = (ptfs) => {
  const newData = [];
  ptfs.forEach((ptf) => {
    const { field, name } = ptf;
    const ptfData = ptf.data.filter((item) => item[field] > 0);
    const dd = ptfData.map((item) => {
      return {
        valeur: item.titre,
        [name]: item[field],
        // [`"${name}"`]: item[field],
      };
    });
    newData.push(...dd);
  });
  // return mergeDataByKey(newData, "valeur");
  return mergeDataByKeyBeta(newData, "valeur");
};
const mergeDataByKey = (data, key) => {
  console.log("mergeDataByKey input", data);
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
  console.log("mergeDataByKey result", result);

  return result;
};
