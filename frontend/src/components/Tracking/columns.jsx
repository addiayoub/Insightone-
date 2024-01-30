import titresWithReference from "../../data/titresWithReference.json";
export const moyColumns = [
  {
    field: "SIM",
    headerName: "SIM",
    width: 200,
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.SIM}</strong>,
  },
  {
    field: "indicateur",
    headerName: "Indicateur",
    width: 200,
    flex: 0.3,
  },
  {
    field: "PTF",
    headerName: "PTF",
    width: 200,
    flex: 0.3,
    renderCell: (params) => params.row.PTF.toFixed(2),
  },
  {
    field: "Indice",
    headerName: "Indice",
    width: 200,
    flex: 0.3,
    renderCell: (params) => params.row.Indice.toFixed(2),
  },
  // {
  //   field: "TE",
  //   headerName: "TE",
  //   width: 200,
  //   flex: 0.3,
  //   renderCell: (params) => params.row.TE,
  // },
];

export const simColumns = (rows, SIM) => {
  // const { CATEGORIE } = refrenceData.find(titr);
  return [
    {
      field: "SECTEUR_ACTIVITE",
      headerName: "Secteur d'activité",
      width: 200,
      flex: 0.5,
      renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      width: 200,
      flex: 0.5,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: "Poids",
      headerName: "Poids",
      width: 200,
      flex: 0.3,
      valueGetter: (params) => params.row[SIM]?.toFixed(2),
      renderCell: (params) => params.row[SIM]?.toFixed(2),
    },
  ];
};
