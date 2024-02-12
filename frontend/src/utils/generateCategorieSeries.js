import titresWithReference from "../data/titresWithReference.json";

export default function generateCategorieSeries(titresSeries) {
  const categorieSeries = {};
  titresSeries = titresSeries.filter((ele) => ele.value > 0.001);
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
  const result = Object.values(categorieSeries).sort(
    (a, b) => b.value - a.value
  );
  console.log("generate result", result);
  return result;
}

export function generateGroupeSeries(titresSeries) {
  const groupeSeries = {};
  let sum = 0;
  titresSeries = titresSeries.filter((ele) => ele.value > 0.00001);
  // Iterate through titres series data
  titresSeries.forEach((titreData) => {
    const titreName = titreData.name;

    // Find the corresponding reference data for the current titre
    const matchingReference = titresWithReference.find(
      (ref) => ref.TITRE === titreName
    );

    if (matchingReference) {
      const groupe = matchingReference.Groupe;

      // Check if the categorie exists in the categorieSeries object
      if (!groupeSeries[groupe]) {
        groupeSeries[groupe] = {
          value: 0,
          name: groupe,
        };
      }

      // Add the value of the current titre to the corresponding CATEGORIE
      groupeSeries[groupe].value += titreData.value;
      sum += titreData.value;
    }
  });

  // Convert the object to an array of objects
  const result = Object.values(groupeSeries).sort((a, b) => b.value - a.value);
  console.log("generateGroupeSeries result", result, sum);
  return result;
}
export function generateClassSeries(titresSeries) {
  const classesSeries = {};
  titresSeries = titresSeries.filter((ele) => ele.value > 0.00001);
  // Iterate through titres series data
  titresSeries.forEach((titreData) => {
    const titreName = titreData.name;

    // Find the corresponding reference data for the current titre
    const matchingReference = titresWithReference.find(
      (ref) => ref.TITRE === titreName
    );

    if (matchingReference) {
      const classe = matchingReference.CLASSE;

      // Check if the categorie exists in the categorieSeries object
      if (!classesSeries[classe]) {
        classesSeries[classe] = {
          value: 0,
          name: classe,
        };
      }

      // Add the value of the current titre to the corresponding CATEGORIE
      classesSeries[classe].value += titreData.value;
    }
  });

  // Convert the object to an array of objects
  const result = Object.values(classesSeries).sort((a, b) => b.value - a.value);
  console.log("generateClassSeries result", result);
  return result;
}
