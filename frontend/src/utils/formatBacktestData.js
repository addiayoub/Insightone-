const mergeDataByKeyBeta = (data, key) => {
  const result = data.reduce((acc, item) => {
    const existingItem = acc.find((accItem) => accItem[key] === item[key]);

    if (existingItem) {
      // Merge the values of other keys
      Object.keys(item).forEach((itemKey) => {
        if (itemKey !== key) {
          existingItem[itemKey] = existingItem[itemKey] || 0;
          existingItem[itemKey] += item[itemKey];
        }
      });
    } else {
      // Create a new item with all keys and set missing keys to 0
      const newItem = {};
      data.forEach((obj) => {
        Object.keys(obj).forEach((objKey) => {
          newItem[objKey] = 0;
        });
      });

      // Set the values of the current item
      Object.keys(item).forEach((itemKey) => {
        newItem[itemKey] = item[itemKey];
      });

      // Add the new item to the result array
      acc.push(newItem);
    }

    return acc;
  }, []);
  console.log("merge beta", result);
  return result;
};

export const transformBacktestData = (ptfs) => {
  const newData = [];
  ptfs.forEach((ptf) => {
    const { field, name } = ptf;
    const ptfData = ptf.data.filter((item) => item[field] > 0);
    const dd = ptfData.map((item) => {
      return {
        valeur: item.titre,
        [name]: item[field],
        // [`"${name}"`]: item[field],
      };
    });
    newData.push(...dd);
  });
  // return mergeDataByKey(newData, "valeur");
  console.log("data before merge", newData);
  return mergeDataByKeyBeta(newData, "valeur");
};
// { LIBELLE: "DOUJA PROM ADDOHA", Importance: 1, Min: 0, Max: 0.1 }
// {
//     "name": "rdt-max",
//     "field": "PTF_Max_Rdt",
//     "type": "Actions",
//     "data": [
//         {
//             "SECTEUR_ACTIVITE": "TRANSPORT",
//             "TICKER": "TIM",
//             "S_CATEGORIE": "TRAN",
//             "titre": "TIMAR",
//             "PTF_Max_Rdt": 100,
//             "isLocked": false
//         }
//     ],
//     "params": {
//         "dateDebut": "12/01/2019",
//         "dateFin": "12/01/2024"
//     },
//     "_id": "65a2472b0338f194c096f37d"
// }
export const transformForBacktest = (ptfs) => {
  const newData = [];
  ptfs.forEach((ptf) => {
    const { field, data } = ptf;
    const ptfData = data.filter((item) => item[field] > 0);
    const dd = ptfData.map((item) => {
      return {
        LIBELLE: item.titre,
        Importance: item[field],
        Min: 0,
        Max: 1,
        // [`"${name}"`]: item[field],
      };
    });
    newData.push(...dd);
  });
  console.log("transformForBacktest", newData);
  return newData;
  // return mergeDataByKey(newData, "valeur");
  // return mergeDataByKeyBeta(newData, "valeur");
};

export const transformForPtfAlloca = (ptfs) => {
  const newData = [];
  ptfs.forEach((ptf) => {
    const { field, data } = ptf;
    if (data) {
      const ptfData = data.filter((item) => item[field] > 0);
      const dd = ptfData.map((item) => {
        return {
          valeur: item.titre,
          view: 0.05,
          min: 0,
          max: 0.1,
          // [`"${name}"`]: item[field],
        };
      });
      newData.push(...dd);
    }
  });
  console.log("transformForPtfAlloca", newData);
  return newData;
  // return mergeDataByKey(newData, "valeur");
  // return mergeDataByKeyBeta(newData, "valeur");
};

const mergeDataByKey = (data, key) => {
  console.log("mergeDataByKey input", data);
  const result = data.reduce((acc, item) => {
    const existingItem = acc.find((accItem) => accItem[key] === item[key]);

    if (existingItem) {
      // Merge the values of other keys
      Object.keys(item).forEach((itemKey) => {
        if (itemKey !== key) {
          existingItem[itemKey] = existingItem[itemKey] || 0;
          existingItem[itemKey] += item[itemKey];
        }
      });
    } else {
      // Add a new item to the result array
      acc.push({ ...item });
    }

    return acc;
  }, []);
  console.log("mergeDataByKey result", result);

  return result;
};
