export function findMinMax(data, fields) {
  if (!Array.isArray(data) || data.length === 0 || !fields) {
    return { max: undefined, min: undefined };
  }

  if (!Array.isArray(fields)) {
    fields = [fields]; // Convert single field to array
  }

  let maxValue = -Infinity;
  let minValue = Infinity;

  data.forEach((item) => {
    fields.forEach((field) => {
      if (item.hasOwnProperty(field)) {
        const value = item[field];
        if (typeof value === "number") {
          maxValue = Math.max(maxValue, value);
          minValue = Math.min(minValue, value);
        }
      }
    });
  });

  return { max: maxValue, min: minValue };
}
