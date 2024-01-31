// Seperate data for AnalyseOPCVM performance tables
const partitionData = (data) => {
  const partsIndices = {
    performance: [
      "Perf. 1 semaine",
      "Perf. 1 mois",
      "Perf. 3 mois",
      "Perf. 6 mois",
      "Perf. YTD",
      "Perf. 1 an",
      "Perf. 2 ans",
      "Perf. 3 ans",
      "Perf. 5 ans",
    ],
    volatilite: ["Volatilité 1 an", "Volatilité 3 ans", "Volatilité 5 ans"],
    sharpe: ["Sharpe 1 an", "Sharpe 3 ans", "Sharpe 5 ans"],
    performanceAnn: ["Perf. An 3 ans", "Perf. An 5 ans"],
  };
  const result = {
    performance: [],
    volatilite: [],
    sharpe: [],
    performanceAnn: [],
    performanceYears: [],
  };

  let currentPart = null;

  const { performance, volatilite, sharpe, performanceAnn } = partsIndices;
  data.forEach((item) => {
    const perf = item.perf;
    if (performance.includes(perf)) {
      currentPart = "performance";
    } else if (volatilite.includes(perf)) {
      currentPart = "volatilite";
    } else if (sharpe.includes(perf)) {
      currentPart = "sharpe";
    } else if (performanceAnn.includes(perf)) {
      currentPart = "performanceAnn";
    } else {
      currentPart = "performanceYears";
    }

    result[currentPart].push(item);
  });
  return Object.values(result);
};
export default partitionData;
