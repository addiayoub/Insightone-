const calculateSumClassification = (data, classification, field) => {
  // Filter the data based on the provided SECTEUR_ACTIVITE
  const filteredData = data.filter(
    (item) => item.Classification === classification
  );

  // Calculate the sum and count of the specified field values
  const result = filteredData.reduce(
    (accumulator, currentItem) => {
      return {
        sum: accumulator.sum + currentItem[field],
        count: accumulator.count + 1,
      };
    },
    { sum: 0, count: 0 }
  );

  return result;
};

export { calculateSumClassification };
