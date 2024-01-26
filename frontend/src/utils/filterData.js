export default function filterData(
  data,
  keyPatternsRegex,
  ignoredKeys = ["seance"]
) {
  console.log("keyPatternsRegex", keyPatternsRegex);
  const result = data.map((obj) => {
    const newObj = { seance: obj.seance };

    Object.keys(obj).forEach((key) => {
      if (
        key !== "seance" &&
        !ignoredKeys.includes(key) &&
        keyPatternsRegex.some((pattern) => new RegExp(pattern).test(key))
      ) {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  });
  console.log("result", result);
  return result;
}
