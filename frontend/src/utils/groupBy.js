export default function groupBy(array, property) {
  return array.reduce((result, obj) => {
    const key = obj[property];
    // console.log("key", key, "key trim", key?.trim());
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(obj);
    return result;
  }, {});
}
