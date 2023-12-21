export function transformToJSON(rawData) {
  // Check if the rawData array has at least two elements (headers and data)
  if (rawData.length < 2) {
    return [];
  }

  // Extract headers
  const headers = rawData[0];

  // Remove headers from data and transform into JSON format
  const jsonData = rawData.slice(1).map((row) => {
    const rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = row[index];
    });
    return rowObject;
  });

  return jsonData;
}
