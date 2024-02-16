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
  const notMatching = [];
  titresSeries = titresSeries.filter((ele) => ele.value > 0.00001);
  // Iterate through titres series data
  titresSeries.forEach((titreData) => {
    const titreName = titreData.name.toLocaleLowerCase();

    // Find the corresponding reference data for the current titre
    const matchingReference = titresWithReference.find(
      (ref) => ref.REFERENCE.toLocaleLowerCase() === titreName
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
    } else {
      notMatching.push(titreName);
    }
  });

  // Convert the object to an array of objects
  const result = Object.values(groupeSeries).sort((a, b) => b.value - a.value);
  console.log(
    "generateGroupeSeries result",
    result,
    sum,
    "notMatching",
    notMatching
  );
  return result;
}
export function generateClassSeries(titresSeries) {
  const classesSeries = {};
  titresSeries = titresSeries.filter((ele) => ele.value > 0.00001);
  // Iterate through titres series data
  titresSeries.forEach((titreData) => {
    const titreName = titreData.name.toLocaleLowerCase();

    // Find the corresponding reference data for the current titre
    const matchingReference = titresWithReference.find(
      (ref) => ref.REFERENCE.toLocaleLowerCase() === titreName
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

const dd = [
  {
    Societe_Gestion: "AFG ASSET MANAGEMENT",
    Classification: "MONETAIRE",
    Type_OPC: "FGP",
    TICKER: "ACM",
    class: "MON",
    sdg: "AFG",
    titre: "AFG CASH MANAGEMENT",
    PTF_Min_Var: 10,
  },
  {
    Societe_Gestion: "AFG ASSET MANAGEMENT",
    Classification: "OMLT",
    Type_OPC: "FGP",
    TICKER: "AIF2",
    class: "OML",
    sdg: "AFG",
    titre: "AFG INCOME FUND",
    PTF_Min_Var: 10,
  },
];

export function generateSeries(data, field, sumOf = "Classification") {
  const sum = data.reduce((acc, row) => {
    const secteur = row[sumOf];
    acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
    return acc;
  }, {});

  const seriesNames = [...new Set(data.map((item) => item[sumOf]))];
  const seriesData = seriesNames
    .map((secteur) => ({
      name: secteur,
      value: sum[secteur],
    }))
    .sort((a, b) => b.value - a.value);
  console.log("Generate ", seriesData);
  return seriesData;
}
