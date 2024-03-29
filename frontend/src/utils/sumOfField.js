export const sumOfField = (data, field, perce = true) => {
  const sum = data.reduce((acc, item) => {
    const value = perce ? Number(item[field]) * 100 : Number(item[field]);
    return acc + value;
  }, 0);
  return parseFloat(sum.toFixed(2));
};
