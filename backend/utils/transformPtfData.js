const transformPtfData = (data) => {
  // Assuming you have some mapping logic to transform your input data to the desired format
  const transformedData = data.map((item) => ({
    titre: item.titres,
    poids: +item.poids,
  }));

  const result = {
    name: "test",
    field: "poids",
    type: "Actions",
    data: transformedData,
    params: {
      dateDebut: null,
      dateFin: null,
    },
  };

  return [result];
};
module.exports = transformPtfData;
