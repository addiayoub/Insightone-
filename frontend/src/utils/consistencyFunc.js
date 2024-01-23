export const consistencyFunc = (data) => {
  const uniqueValues = [1, 2, 3, 4];

  const res = {};
  const totals = {
    quartile_perf_1S: 0,
    quartile_perf_1M: 0,
    quartile_perf_3M: 0,
  };

  uniqueValues.forEach((value) => {
    res[value] = {
      quartile_perf_1S: 0,
      quartile_perf_1M: 0,
      quartile_perf_3M: 0,
    };

    data.forEach((item) => {
      if (item.quartile_perf_1S === value) {
        res[value].quartile_perf_1S++;
        totals.quartile_perf_1S++;
      }

      if (item.quartile_perf_1M === value) {
        res[value].quartile_perf_1M++;
        totals.quartile_perf_1M++;
      }

      if (item.quartile_perf_3M === value) {
        res[value].quartile_perf_3M++;
        totals.quartile_perf_3M++;
      }
    });
  });

  return { count: res, totals };
};
