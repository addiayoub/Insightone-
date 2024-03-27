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
  console.log("poidsModFun data", data);
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

const preReliquatFunc = (data, oldPoids) => {
  return data.map((item) => {
    const { isModified, titre, poids } = item;
    const newValue = isModified ? -oldPoids[titre] + +poids : 0;
    return {
      titre,
      value: newValue,
    };
  });
};

const poidsNulleFunc = (data, preReliquat, oldPoids, sumSecteur, poidsMod) => {
  console.log("sum preRe", calculatePoidsIntModSum(preReliquat));
  const sumPreReliquat = calculatePoidsIntModSum(preReliquat);
  const percent = (1 / 100) * sumSecteur;
  return data.map((item) => {
    const { titre } = item;
    const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    const newValue =
      sumPreReliquat < 0 && oldPoids[titre] == 0 ? percent : fromPoidsMod.value;
    return {
      titre,
      value: newValue,
    };
  });
};

const calculatePoidsIntModSum = (poids) => {
  console.log("Poids calculatePoidsIntModSum", poids);
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

const poidsFinalFunc = (data, poidsInt, poidsMod, reliquat, poidsNulle) => {
  const result = data.reduce((acc, item) => {
    // const { titre } = item;
    // const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    // const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    // const sumPoidsMod = calculatePoidsIntModSum(poidsMod);
    // const newValue =
    //   fromPoidsMod.value === 0
    //     ? fromPoidsInt.value
    //     : (reliquat * fromPoidsMod.value) / sumPoidsMod;
    // acc[titre] = +newValue.toFixed(2);
    const { titre } = item;
    const fromPoidsNulle = poidsNulle.find((item) => item.titre === titre);
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    const sumPoidsNulle = calculatePoidsIntModSum(poidsNulle);
    const newValue =
      fromPoidsNulle.value === 0
        ? fromPoidsInt.value
        : (reliquat * fromPoidsNulle.value) / sumPoidsNulle;
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

const ajuster = (newRows, setNewRows, field, oldRows) => {
  const locked = newRows.filter((item) => item.isLocked);
  const sumLocked = calculateSumPoids(locked, field);
  const oldSum = calculateSumPoids(oldRows, field);
  const newSum = calculateSumPoids(newRows, field);
  const reliquat = 100 - sumLocked;
  const unLocked = newRows.filter((item) => !item.isLocked);
  const sumUnlocked = calculateSumPoids(unLocked, field);
  const unLockedTitres = unLocked.map((item) => item.titre);

  console.log("--------------- AJUSTER FUNC ---------------");
  console.log("sumLocked", sumLocked);
  console.log("reliquat", reliquat);
  console.log("newRows", newRows);
  console.log("oldRows", oldRows);
  console.log("oldSum", oldSum);
  console.log("newSum", newSum);
  setNewRows((prevData) =>
    prevData.map((item) => {
      if (sumLocked === 0) {
        console.log("sumlOCked is zero", sumLocked);
        console.log("unLockedTitres", unLockedTitres);
        if (unLockedTitres.includes(item.titre)) {
          console.log("unLockedTitres.includes", true);
          let newPoids = 100 / unLockedTitres.length;
          newPoids = isNaN(newPoids) || newPoids < 0 ? 0 : newPoids;
          console.log("newPoids", newPoids);
          return { ...item, [field]: newPoids };
        }
        return { ...item };
      } else {
        if (unLockedTitres.includes(item.titre)) {
          if (item[field] == 0) {
            let newPoids = reliquat / unLockedTitres.length;
            newPoids = isNaN(newPoids) || newPoids < 0 ? 0 : newPoids;
            return { ...item, [field]: newPoids };
          } else {
            let newPoids = (item[field] * reliquat) / sumUnlocked;
            newPoids = isNaN(newPoids) || newPoids < 0 ? 0 : newPoids;
            // newPoids = isNaN(newPoids) ? 0 : newPoids;
            return { ...item, [field]: newPoids };
          }
        }
        return { ...item };
      }
    })
  );
};

const calculateEachSecteurSum = (data, field, sumOf = "SECTEUR_ACTIVITE") => {
  return data.reduce((acc, row) => {
    const secteur = row[sumOf];
    acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
    return acc;
  }, {});
};

const injectSecteurSum = (rows, secteurSums) => {
  return rows.map((row) => {
    const secteur = row.SECTEUR_ACTIVITE;
    const sum = secteurSums[secteur] || 0;
    return { ...row, somme: sum };
  });
};

export {
  calculateEachSecteurSum,
  injectSecteurSum,
  ajuster,
  preReliquatFunc,
  calculateSumPoids,
  poidsNulleFunc,
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
