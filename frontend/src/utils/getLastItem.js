export const getLastItem = (arr) => {
  if (arr.length < 1) {
    return arr;
  }
  return arr[arr.length - 1];
};
