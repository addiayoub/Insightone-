const ref = {
  "NOMINAL 1 MOIS": 1 / 12,
  "NOMINAL 3 MOIS": 3 / 12,
  "NOMINAL 6 MOIS": 6 / 12,
  "NOMINAL 1 AN": 1,
  "NOMINAL 2 ANS": 2,
  "NOMINAL 3 ANS": 3,
  "NOMINAL 5 ANS": 5,
  "NOMINAL 10 ANS": 10,
  "NOMINAL 15 ANS": 15,
  "NOMINAL 20 ANS": 20,
  "NOMINAL 25 ANS": 25,
  "NOMINAL 30 ANS": 30,
};

// Data: [{name, value}]
const calculateNominalPoids = (data) => {
  const sum = data.reduce((sum, item) => {
    if (ref.hasOwnProperty(item.name)) {
      sum += ref[item.name];
    }
    return sum;
  }, 0);
  return (sum / 100).toFixed(2);
};

export default calculateNominalPoids;
