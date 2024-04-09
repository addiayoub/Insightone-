import { getLastItem } from "./getLastItem";

const calcResume = (data, field, perce = true) => {
  const sum = data.reduce((acc, item) => {
    const value = perce ? Number(item[field]) * 100 : Number(item[field]);
    return acc + value;
  }, 0);
  return parseFloat(sum.toFixed(2));
};

function getPerIndice(obj) {
  let sum = 0;

  // Iterate over the keys of the object
  for (const key in obj) {
    // Check if the value is a number
    if (typeof obj[key] === "number") {
      // Add the value to the total sum
      sum += obj[key];
    }
  }

  return parseFloat(sum.toFixed(2));
}

function getResidu(perf, sum) {
  return parseFloat((perf - getPerIndice(sum)).toFixed(2));
}

function getPerf(data) {
  const { VALEUR_B100 } = getLastItem(data);
  const perf = VALEUR_B100 / 100 - 1;
  return VALEUR_B100 ? perf : 0;
}

function getLastPerfGli(data) {
  if (data?.length > 0) {
    data.sort((a, b) => {
      // Convert the date strings to Date objects for comparison
      const dateA = new Date(a.Seance);
      const dateB = new Date(b.Seance);

      // Compare the dates in descending order
      return dateB - dateA;
    });
    return [data[0]];
  }
  return data;
}

function handleStats(data) {
  let stats = {
    duration: "-",
    moyDuration: "-",
    coupon: "-",
    ytm: "-",
    dText: "-",
    mDText: "-",
  };
  if (!Array.isArray(data)) {
    stats = {
      duration: parseFloat(data["DURATION"].toFixed(2)),
      moyDuration: parseFloat(data["MOY_DURATION"].toFixed(2)),
      coupon: parseFloat((data["COUPON"] * 100).toFixed(2)),
      ytm: parseFloat((data["YTM"] * 100).toFixed(2)),
    };
    stats = {
      ...stats,
      dText: handleDuration(stats.duration),
      mDText: handleDuration(stats.moyDuration),
    };
  }
  console.log("stats", stats);
  return stats;
  // return Object.entries(stats).map(([key, value]) => ({ name: key, value }));
}

const handleDuration = (duration) => {
  if (duration < 1) {
    const months = Math.trunc(duration * 12);
    const days = Math.trunc((duration - months / 12) * 365);
    // =INT((F27-G27/12)*365)
    return `${months} mois ${days} jour(s)`;
  } else {
    const years = Math.trunc(duration);
    const months = Math.trunc((duration - years) * 12);
    const days = Math.trunc((duration - years - months / 12) * 365);
    return `${years} année ${months} mois ${days} jour(s)`;
  }
};

export {
  calcResume,
  getResidu,
  getPerf,
  handleStats,
  getLastPerfGli,
  getPerIndice,
};
