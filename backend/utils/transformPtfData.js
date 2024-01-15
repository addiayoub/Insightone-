const transformPtfData = (data, name, type, titres) => {
  // console.log(
  //   "Titres are ",
  //   titres.find((item) => item.TITRE === "IAM")
  // );
  const transformedData = data.map((item) => {
    const dataRef = titres.find((ele) => ele.TITRE === item.titres);
    const poids = item.poids ? +item.poids : 0;
    if (type === "Actions") {
      return {
        titre: dataRef?.REFERENCE ?? item.titres,
        poids,
        SECTEUR_ACTIVITE: dataRef?.CATEGORIE,
      };
    } else {
      return {
        titre: dataRef?.REFERENCE ?? item.titres,
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
