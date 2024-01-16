const transformPtfData = (data, name, type, titres) => {
  console.log("transformPtfData", data);
  const [titreName, titreValue] = Object.keys(data[0]);
  console.log("keys", titreName, titreValue);

  const transformedData = data.map((row) => {
    const dataRef = titres.find((ele) => ele.TITRE === row[titreName]);
    const poids = row[titreValue] ? +row[titreValue] : 0;
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

  const result = {
    name,
    field: "poids",
    type,
    data: transformedData,
    params: {
      dateDebut: null,
      dateFin: null,
    },
  };

  return [result];
};
module.exports = transformPtfData;
