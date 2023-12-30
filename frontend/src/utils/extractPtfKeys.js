export const extractPtfKeys = (data) => {
  const ptfKeys = [];

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key.startsWith("ptf") && !ptfKeys.includes(key)) {
        ptfKeys.push(key);
      }
    });
  });

  return ptfKeys;
};
