export const getLastItem = (arr) => {
  if (arr.length < 1) {
    return arr;
  }
  return arr[arr.length - 1];
};

export const getLastItemWithFilter = (array, condition) => {
  // Filter the array based on the condition
  const filteredArray = array.filter(condition);

  // Get the last element from the filtered array
  return filteredArray.pop();
};
