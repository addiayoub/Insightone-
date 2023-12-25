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

const columnsIndi = [
  {
    field: "Nom",
    headerName: "Nom",
    width: 360,
    flex: 1.5,
    renderCell: (params) => <strong>{params.row.Nom}</strong>,
  },
  {
    field: "Valeur",
    headerName: "Valeur",
    width: 360,
    flex: 1,
    renderCell: (params) => params.row?.Valeur?.toFixed(2),
  },
  {
    field: "Type_position",
    headerName: "Type de position",
    width: 360,
    flex: 1,
    renderCell: (params) => {
      const cellValue = params.row.Type_position;
      return textColor(cellValue);
    },
  },
];
const columnsMoy = [
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
const columnsNews = [
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
const columnsBilan = [
  {
    field: "a",
    headerName: "A",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.a}</strong>,
  },
  {
    field: "b",
    headerName: "B",
    flex: 0.3,
  },
  {
    field: "c",
    headerName: "C",
    flex: 0.3,
  },
  {
    field: "d",
    headerName: "D",
    flex: 0.3,
  },
  {
    field: "periodicite",
    headerName: "Periodicite",
    flex: 0.3,
  },
  {
    field: "ordre",
    headerName: "Ordre",
    flex: 0.3,
  },
];
const columnsCmptRes = [
  {
    field: "a",
    headerName: "A",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.a}</strong>,
  },
  {
    field: "b",
    headerName: "B",
    flex: 0.3,
  },
  {
    field: "c",
    headerName: "C",
    flex: 0.3,
  },
  {
    field: "d",
    headerName: "D",
    flex: 0.3,
  },
  {
    field: "periodicite",
    headerName: "Periodicite",
    flex: 0.3,
  },
  {
    field: "ordre",
    headerName: "Ordre",
    flex: 0.3,
  },
];
export { columnsIndi, columnsMoy, columnsNews, columnsBilan, columnsCmptRes };
