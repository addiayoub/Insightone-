const maxSlider = (oldMax, list) => {
  oldMax,
    list -
      list.reduce((sum, item) => {
        const weight = item.isLocked ? item.poids : 0;
        return sum + weight;
      }, 0);
};
const combinePoidsAndLockStates = (poidsObj, isLockedObj, isModifiedStates) => {
  const result = [];

  for (const titre in poidsObj) {
    if (poidsObj.hasOwnProperty(titre)) {
      const poids = poidsObj[titre];
      const isLocked = isLockedObj[titre];
      const isModified = isModifiedStates[titre];
      result.push({ titre, poids, isLocked, isModified });
    }
  }

  return result;
};

const sliderModFun = (data, newValues, maxSlider) => {
  return data.map((item) => {
    const { isModified, titre } = item;
    const newValue = isModified
      ? Math.min(maxSlider, newValues[titre])
      : maxSlider;

    return {
      titre,
      value: newValue,
    };
  });
};

const poidsIntFun = (data, sliderMod) => {
  return data.map((item) => {
    const { isLocked, isModified, titre, poids } = item;
    const fromSliderMod = sliderMod.find((item) => item.titre === titre);
    const newValue = isLocked ? poids : isModified ? fromSliderMod.value : 0;

    return {
      titre,
      value: newValue,
    };
  });
};

const poidsModFun = (data, poidsInt) => {
  return data.map((item) => {
    const { isLocked, isModified, titre, poids } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);

    const newValue = fromPoidsInt.value === 0 ? poids : 0;

    return {
      titre,
      value: newValue,
    };
  });
};

const calculatePoidsIntModSum = (poids) => {
  return poids.reduce((sum, item) => sum + item.value, 0);
};

const reliquatFunc = (secteurPoids, poidsInt) => {
  const sumPoidsInt = calculatePoidsIntModSum(poidsInt);
  const res = secteurPoids - sumPoidsInt;
  return res;
};

const poidsFinalFunc2 = (data, poidsInt, poidsMod, reliquat) => {
  return data.map((item) => {
    const { titre } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    const sumPoidsMod = calculatePoidsIntModSum(poidsMod);
    const newValue =
      fromPoidsMod.value === 0
        ? fromPoidsInt.value
        : (reliquat * fromPoidsMod.value) / sumPoidsMod;

    return {
      [titre]: +newValue.toFixed(2),
    };
  });
};

const poidsFinalFunc = (data, poidsInt, poidsMod, reliquat) => {
  const result = data.reduce((acc, item) => {
    const { titre } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    const sumPoidsMod = calculatePoidsIntModSum(poidsMod);
    const newValue =
      fromPoidsMod.value === 0
        ? fromPoidsInt.value
        : (reliquat * fromPoidsMod.value) / sumPoidsMod;

    acc[titre] = +newValue.toFixed(2);
    return acc;
  }, {});

  return result;
};

const calculateFinalSum = (data) => {
  const sum = Object.values(data).reduce((sum, value) => sum + value, 0);
  return +sum.toFixed(2);
};

export {
  calculateFinalSum,
  calculatePoidsIntModSum,
  combinePoidsAndLockStates,
  poidsFinalFunc,
  poidsFinalFunc2,
  poidsIntFun,
  poidsModFun,
  reliquatFunc,
  sliderModFun,
};
