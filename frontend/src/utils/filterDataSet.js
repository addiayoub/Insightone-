const filterDataSet = (data, keysToFilter) => {
  return data.map((obj) => {
    const { seance, ...rest } = obj;
    const filteredKeys = Object.fromEntries(
      Object.entries(rest).filter(([key]) => keysToFilter.includes(key))
    );
    return { seance, ...filteredKeys };
  });
};
export default filterDataSet;
