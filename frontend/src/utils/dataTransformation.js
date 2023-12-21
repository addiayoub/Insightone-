export const transformData = (data) => {
  return data.reduce((result, item) => {
    for (const key in item) {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item[key]);
    }
    return result;
  }, {});
};
