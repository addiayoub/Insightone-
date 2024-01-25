const transformPtfData = (data, name, type, titres) => {
  console.log("transformPtfData", data);
  const [titreName, titreValue, minValue, maxValue] = Object.keys(data[0]);
  console.log("keys", titreName, titreValue, minValue, maxValue);

  const transformedData = data.map((row) => {
    const dataRef = titres.find(
      (ele) => ele.TITRE.toLowerCase() === row[titreName].toLowerCase()
    );
    let poids = row[titreValue]
      ? parseFloat(row[titreValue].replace(",", "."))
      : 0;
    poids = isNaN(poids) ? 0 : poids;
    const titre = dataRef?.REFERENCE ?? row[titreName];
    const [min, max] = handleMinMax(row[minValue], row[maxValue]);
    if (type === "Actions") {
      return {
        titre,
        poids,
        SECTEUR_ACTIVITE: dataRef?.CATEGORIE,
        min,
        max,
      };
    } else {
      return {
        titre,
        poids,
        Classification: dataRef?.CLASSE,
        Societe_Gestion: dataRef?.CATEGORIE,
        min,
        max,
      };
    }
  });

  const uniqueTitres = removeDuplicationTitres(transformedData);
  const result = {
    name,
    field: "poids",
    type,
    data: uniqueTitres,
    params: {
      dateDebut: null,
      dateFin: null,
    },
  };

  return [result];
};

const handleMinMax = (min, max) => {
  let minValue = min ? parseFloat(min.replace(",", ".")) : 0;
  let maxValue = max ? parseFloat(max.replace(",", ".")) : 0;

  minValue = isNaN(minValue) || minValue < 0 ? 0 : minValue;
  maxValue = isNaN(maxValue) || maxValue > 1 ? 1 : maxValue;

  minValue = minValue > maxValue ? 0 : minValue;
  maxValue = maxValue < minValue ? 1 : maxValue;

  return [minValue, maxValue];
};

function removeDuplicationTitres(data) {
  const uniqueTitres = {};
  const result = [];

  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    if (!uniqueTitres[item.titre]) {
      result.unshift(item);
      uniqueTitres[item.titre] = true;
    }
  }
  return result;
}

module.exports = transformPtfData;
