function removeNullAndEmpty(arrayOfArrays) {
  return arrayOfArrays
    .map((innerArray) => {
      // Use filter to remove null and empty strings
      const filteredArray = innerArray.filter(
        (value) => value !== null && value !== ""
      );
      return filteredArray.length > 0 ? filteredArray : null; // Remove empty arrays
    })
    .filter(Boolean); // Remove null values (empty arrays)
}

export function transformToJSON(data, isHeaders = false) {
  data = removeNullAndEmpty(data);
  console.log("data removeNullAndEmpty", data);
  const headers = isHeaders
    ? data[0]
    : data[0]?.map((_, index) => `field${index + 1}`);
  data = isHeaders ? data.slice(1) : data;
  if (data) {
    return data.map((innerArray) => {
      const jsonObject = {};
      innerArray.forEach((value, index) => {
        jsonObject[headers[index]] = value;
      });
      return jsonObject;
    });
  }
  return [];
}
