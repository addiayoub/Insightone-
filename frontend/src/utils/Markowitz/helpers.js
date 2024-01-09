const calculateMaxSlider = (oldMax, list) => {
  const sumList = list.reduce((sum, item) => {
    const weight = item.isLocked ? item.poids : 0;
    return sum + weight;
  }, 0);
  return oldMax - sumList;
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
    const { isModified, titre, poids } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    // const newValue = fromPoidsInt.value === 0 ? poids : 0;
    const newValue = fromPoidsInt.value === 0 && !isModified ? poids : 0;
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
  console.log(
    "reliquatFunc",
    `sumPoidsInt: ${sumPoidsInt} - secteurPoids: ${secteurPoids} `
  );
  const res = secteurPoids - sumPoidsInt;
  return isNaN(res) ? secteurPoids : res;
  // return res;
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
const updatepoidsFinal = (data, isMax, isMaxTitre) => {
  if (isMax) {
    for (const [titre, value] of Object.entries(data)) {
      data[titre] = titre === isMaxTitre ? value : 0;
    }
  }
};

const calculateFinalSum = (data) => {
  const sum = Object.values(data).reduce((sum, value) => sum + value, 0);
  return +sum.toFixed(2);
};

const isReachMax = (data, maxValue) => {
  for (const [titre, value] of Object.entries(data)) {
    if (value === maxValue) {
      return {
        isMax: true,
        titre: titre,
      };
    }
  }

  return {
    isMax: false,
    titre: null,
  };
};

const calculateSumSecteur = (data, secteur, field) => {
  // Filter the data based on the provided SECTEUR_ACTIVITE
  const filteredData = data.filter((item) => item.SECTEUR_ACTIVITE === secteur);

  // Calculate the sum and count of the specified field values
  const result = filteredData.reduce(
    (accumulator, currentItem) => {
      return {
        sum: accumulator.sum + currentItem[field],
        count: accumulator.count + 1,
      };
    },
    { sum: 0, count: 0 }
  );

  return result;
};

const calculateSumPoids = (data, field) => {
  const sum = data.reduce((acc, item) => acc + item[field], 0);
  return parseFloat(sum.toFixed(2));
};

const ajuster = (newRows, setNewRows, field) => {
  const locked = newRows.filter((item) => item.isLocked);
  const reliquat = 100 - calculateSumPoids(locked, field);
  const unLocked = newRows.filter((item) => !item.isLocked);
  const sumUnlocked = calculateSumPoids(unLocked, field);
  const unLockedTitres = unLocked.map((item) => item.titre);

  setNewRows((prevData) =>
    prevData.map((item) => {
      if (unLockedTitres.includes(item.titre)) {
        const newPoids = (item[field] * reliquat) / sumUnlocked;
        console.log("NewPoids", newPoids);
        return { ...item, [field]: isNaN(newPoids) ? 0 : newPoids };
      }
      return { ...item };
    })
  );
};

export {
  ajuster,
  calculateSumPoids,
  calculateMaxSlider,
  calculateFinalSum,
  calculatePoidsIntModSum,
  combinePoidsAndLockStates,
  poidsFinalFunc,
  poidsFinalFunc2,
  poidsIntFun,
  poidsModFun,
  reliquatFunc,
  sliderModFun,
  isReachMax,
  updatepoidsFinal,
  calculateSumSecteur,
};
