import titresWithReference from "../data/titresWithReference.json";

export default function generateCategorieSeries(titresSeries) {
  const categorieSeries = {};

  // Iterate through titres series data
  titresSeries.forEach((titreData) => {
    const titreName = titreData.name;

    // Find the corresponding reference data for the current titre
    const matchingReference = titresWithReference.find(
      (ref) => ref.TITRE === titreName
    );

    if (matchingReference) {
      const categorie = matchingReference.CATEGORIE;

      // Check if the categorie exists in the categorieSeries object
      if (!categorieSeries[categorie]) {
        categorieSeries[categorie] = {
          value: 0,
          name: categorie,
        };
      }

      // Add the value of the current titre to the corresponding CATEGORIE
      categorieSeries[categorie].value += titreData.value;
    }
  });

  // Convert the object to an array of objects
  const result = Object.values(categorieSeries);

  return result;
}
