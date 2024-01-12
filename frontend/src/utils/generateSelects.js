const generateSelects = (titres, choice) => {
  const selects = [];
  console.log("titres", titres);
  switch (choice) {
    case "OPCVM":
      selects.push({
        classes: {
          label: "Classification",
          data: titres[choice].map((item) => item.classe),
        },
        categories: {
          label: "Sociéte de gestion",
          data: titres[choice].map((item) => item.categorie),
        },
        titres: {
          label: "Titre",
          data: titres[choice].map((item) => item.libelle),
        },
      });
      break;
    case "Actions":
      selects.push({
        classes: {
          label: "Classe",
          data: titres[choice].map((item) => item.classe),
        },
        categories: {
          label: "Secteur d'activité",
          data: titres[choice].map((item) => item.categorie),
        },
        titres: {
          label: "Titre",
          data: titres[choice].map((item) => item.libelle),
        },
      });
      break;
    case "Indices":
      selects.push({
        classes: {
          label: "Classe",
          data: titres[choice].map((item) => item.classe),
        },
        categories: {
          label: "Catégorie",
          data: titres[choice].map((item) => item.categorie),
        },
        titres: {
          label: "Titre",
          data: titres[choice].map((item) => item.libelle),
        },
      });
      break;
    default:
      selects.push({
        classes: [],
        categories: [],
        titres: [],
      });
      break;
  }
  return selects;
};
function getLabels(choice) {
  switch (choice) {
    case "OPCVM":
      return {
        classes: "Classification",
        categories: "Sociéte de gestion",
        titres: "Titre",
      };
    case "Actions":
      return {
        classes: "Classe",
        categories: "Secteur d'activité",
        titres: "Titre",
      };
    case "Indices":
      return {
        classes: "Classe",
        categories: "Catégorie",
        titres: "Titre",
      };
    default:
      return {
        classes: "",
        categories: "",
        titres: "",
      };
  }
}

const filterSelects = (
  data,
  choice,
  selects,
  classes,
  categories,
  excludeTitres
) => {
  const labels = getLabels(choice);
  data = data[choice];
  const select = selects[0];
  let filteredCate = select.categories.data;
  let filteredTitres = select.titres.data;
  const CLASSES = { label: labels.classes, data: select.classes.data };
  if (classes.length > 0) {
    filteredCate = data
      .filter((item) => classes.includes(item.classe))
      .map((item) => item.categorie);
    filteredTitres = data
      .filter(
        (item) =>
          classes.includes(item.classe) && filteredCate.includes(item.categorie)
      )
      .map((item) => item.libelle);
  }
  if (categories.length > 0) {
    filteredTitres = data
      .filter((item) => categories.includes(item.categorie))
      .map((item) => item.libelle);
  }
  if (classes.length > 0 && categories.length > 0) {
    filteredTitres = data
      .filter(
        (item) =>
          categories.includes(item.categorie) && classes.includes(item.classe)
      )
      .map((item) => item.libelle);
  }
  let newSelects = {
    classes: CLASSES,
    categories: { label: labels.categories, data: filteredCate },
    titres: {
      label: labels.titres,
      data: filteredTitres.filter((titre) => !excludeTitres.includes(titre)),
    },
  };
  return [newSelects];
};
export { generateSelects, filterSelects };
