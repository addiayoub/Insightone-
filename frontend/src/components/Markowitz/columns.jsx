import RenderStarsWithRating from "./RenderStarsWithRating";
import TextColor from "./TextColor";

export const columns = [
  {
    field: "LIBELLE",
    headerName: "LIBELLE",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    width: 360,
    renderCell: (params) => <strong>{params.row.LIBELLE}</strong>,
  },
  {
    field: "Performance",
    headerName: "Performance",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) => (
      <TextColor value={(params.row.Performance * 100).toFixed(2)} />
    ),
  },
  {
    field: "Performance_AN",
    headerName: "Performance Anualisé",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) => (
      <TextColor value={(params.row.Performance_AN * 100).toFixed(2)} />
    ),
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    headerAlign: "center",
    align: "center",
    flex: 0.25,
    width: 360,
    renderCell: (params) => (
      <TextColor value={(params.row.Volatilite * 100).toFixed(2)} />
    ),
  },
  {
    field: "VQM",
    headerName: "VQM",
    headerAlign: "center",
    align: "center",
    flex: 0.45,
    width: 360,
    renderCell: (params) => {
      return <RenderStarsWithRating value={params.row.VQM} />;
    },
  },
  {
    field: "Nb_Semaine",
    headerName: "Nombre de semaines",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) => params.row.Nb_Semaine,
  },
];
