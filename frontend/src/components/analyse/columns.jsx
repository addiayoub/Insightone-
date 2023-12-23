import { formatDate } from "../../utils/FormatDate";

const textColor = (cellValue) => {
  let className = " ";
  const cell = cellValue.toLowerCase();

  if (cell.includes("achat")) {
    className = "text-[var(--text-success)]";
  } else if (cell.includes("vente")) {
    className = "text-[var(--text-warning)]";
  } else {
    className = "text-[var(--text-muted)]";
  }
  return <span className={`${className} font-semibold`}>{cellValue}</span>;
};

export const columnsIndi = [
  {
    field: "Nom",
    headerName: "Nom",
    width: 360,
    flex: 1.5,
    filterable: true,
    // renderCell: (params) => <strong>{params.row.Nom}</strong>,
    // valueGetter: (params) => {
    //   console.log(params.row.Nom);
    //   return params.row.Nom;
    // },
  },
  // {
  //   field: "Valeur",
  //   headerName: "Valeur",
  //   width: 360,
  //   flex: 1,
  //   renderCell: (params) => params.row?.Valeur?.toFixed(2),
  // },
  // {
  //   field: "Type_position",
  //   headerName: "Type de position",
  //   width: 360,
  //   flex: 1,
  //   renderCell: (params) => {
  //     const cellValue = params.row.Type_position;
  //     return textColor(cellValue);
  //   },
  // },
];
export const columnsMoy = [
  {
    field: "Periode",
    headerName: "Nom",
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.Periode}</strong>,
  },
  {
    field: "Simple",
    headerName: "Simple",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex gap-2.5">
          <span>{params.row?.Simple?.toFixed(2)}</span>
          {textColor(params.row.sign_simple)}
        </div>
      );
    },
  },
  {
    field: "Exponentiel",
    headerName: "Exponentiel",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex gap-2.5">
          <span>{params.row?.Exponentiel?.toFixed(2)}</span>
          {textColor(params.row.sign_expo)}
        </div>
      );
    },
  },
];
export const columnsNews = [
  {
    field: "libelle",
    headerName: "Libellé",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.libelle}</strong>,
  },
  {
    field: "seance",
    headerName: "Séance",
    flex: 0.3,
    renderCell: (params) => <strong>{formatDate(params.row.seance)}</strong>,
  },
  {
    field: "titre",
    headerName: "Titre",
    flex: 1,
    renderCell: (params) => params.row.titre,
  },
];
