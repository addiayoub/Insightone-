export const addTitres = (data, titresToAdd, field, type) => {
  if (type === "Actions") {
    return titresToAdd.map((titre) => {
      const matchingObject = data.find((obj) => obj.libelle === titre);

      if (matchingObject) {
        return {
          SECTEUR_ACTIVITE: matchingObject.categorie,
          titre: matchingObject.libelle,
          [field]: 0,
          isLocked: false,
        };
      } else {
        // Handle the case where a matching object is not found
        console.warn(`No matching object found for titre: ${titre}`);
        return null; // or handle it differently based on your requirements
      }
    });
  } else {
    return titresToAdd.map((titre) => {
      const matchingObject = data.find((obj) => obj.libelle === titre);

      if (matchingObject) {
        return {
          Classification: matchingObject.classe,
          Societe_Gestion: matchingObject.categorie,
          titre: matchingObject.libelle,
          [field]: 0,
          isLocked: false,
        };
      } else {
        // Handle the case where a matching object is not found
        console.warn(`No matching object found for titre: ${titre}`);
        return null; // or handle it differently based on your requirements
      }
    });
  }
};
