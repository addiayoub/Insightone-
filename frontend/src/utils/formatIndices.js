export const formatIndices = (data) => {
  const indices = {};
  data.forEach((item) => {
    const { CLASSE, CATEGORIE, NOM_INDICE } = item;

    if (!indices[CLASSE]) {
      indices[CLASSE] = {};
    }

    if (!indices[CLASSE][CATEGORIE]) {
      indices[CLASSE][CATEGORIE] = [];
    }

    indices[CLASSE][CATEGORIE].push(NOM_INDICE);
  });
  return indices;
};

