export const columns = [
  {
    field: "name",
    headerName: "Titre",
    flex: 0.7,
    renderCell: (params) => <strong>{params.row.name}</strong>,
  },
  {
    field: "dateDebut",
    headerName: "Date Début",
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.params.dateDebut}</strong>,
  },
  {
    field: "dateFin",
    headerName: "Date Fin",
    flex: 0.7,
    renderCell: (params) => <strong>{params.row.params.dateFin}</strong>,
  },
  {
    field: "type",
    headerName: "Type",
    renderCell: (params) => <strong>{params.row.type}</strong>,
  },
];
