export const filterByPtf = (data, ptfName) => {
  return data.map((item) => {
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
};
