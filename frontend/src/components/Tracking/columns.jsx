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
