// const data = [{ id: 1, name: "John", age: 30 }...];
// countUniqueValues(data, "name"); // Returns: 3 (John, Alice, Bob)
export const countUniqueValues = (data, field) => {
  const uniqueValues = new Set();

  // Iterate over the array of objects
  data?.forEach((item) => {
    // Add the value of the specified field to the Set
    uniqueValues.add(item[field]);
  });

  // Return the size of the Set, which represents the number of unique values
  return uniqueValues.size;
};
