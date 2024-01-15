const transformPtfData = (data, name, type, titres) => {
  // console.log(
  //   "Titres are ",
  //   titres.find((item) => item.TITRE === "IAM")
  // );
  const transformedData = data.map((item) => {
    const dataRef = titres.find((ele) => ele.TITRE === item.titres);
    return {
      titre: dataRef?.REFERENCE ?? item.titres,
      poids: +item.poids,
      SECTEUR_ACTIVITE: dataRef?.CATEGORIE,
    };
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
