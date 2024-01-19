export const extractKeys = (data, excludedKeys) => {
  const keys = [];

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!excludedKeys.includes(key) && !keys.includes(key)) {
        keys.push(key);
      }
    });
  });

  return keys;
};
