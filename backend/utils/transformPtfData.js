const transformPtfData = (data, name, type, titres) => {
  console.log("transformPtfData", data);
  const [titreName, titreValue] = Object.keys(data[0]);
  console.log("keys", titreName, titreValue);

  const transformedData = data.map((row) => {
    const dataRef = titres.find(
      (ele) => ele.TITRE.toLowerCase() === row[titreName].toLowerCase()
    );
    let poids = row[titreValue] ? +row[titreValue] : 0;
    poids = isNaN(poids) ? 0 : poids;
    const titre = dataRef?.REFERENCE ?? row[titreName];
    if (type === "Actions") {
      return {
        titre,
        poids,
        SECTEUR_ACTIVITE: dataRef?.CATEGORIE,
      };
    } else {
      return {
        titre,
        poids,
        Classification: dataRef?.CLASSE,
        Societe_Gestion: dataRef?.CATEGORIE,
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
