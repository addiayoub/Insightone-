import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export const simColumns = (SIM) => {
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
      headerName: "Poids(%)",
      width: 200,
      flex: 0.3,
      valueGetter: (params) => params.row[SIM]?.toFixed(2),
      renderCell: (params) => (
        <span className="font-semibold">{params.row[SIM]?.toFixed(2)}</span>
      ),
    },
    {
      field: "somme",
      headerName: "Somme",
      flex: 0.2,
      valueGetter: (params) => {
        const sum = params.row.somme;
        return sum.toFixed(2);
      },
      renderCell: (params) => {
        const sum = params.row.somme;
        return (
          <span className="font-semibold">{formatNumberWithSpaces(sum)}</span>
        );
      },
    },
  ];
};
