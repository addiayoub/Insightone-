import { createColumns } from "../../utils/createColumns";

const textColor = (cellValue) => {
  let className = " ";
  const cell = cellValue.toLowerCase();

  if (cell.includes("achat")) {
    className = "text-success";
  } else if (cell.includes("vente")) {
    className = "text-error";
  } else {
    className = "text-muted";
  }
  return <span className={`${className} font-semibold`}>{cellValue}</span>;
};
// Indicateurs techniques
const indiDef = [
  {
    field: "Nom",
    headerName: "Nom",
    flex: 1.5,
  },
  {
    field: "Valeur",
    headerName: "Valeur",
    flex: 1,
    headerAlign: "center",
    align: "left",
    isNum: true,
  },
  {
    field: "Type_position",
    headerName: "Type de position",
    // width: 360,
    flex: 0.7,
    renderCell: (row) => {
      const cellValue = row.Type_position;
      return textColor(cellValue);
    },
  },
];
const columnsIndi = createColumns(indiDef);

// Moyennes Mobiles
const moyDef = [
  {
    field: "Periode",
    headerName: "Nom",
    flex: 0.5,
  },
  {
    field: "Simple",
    headerName: "Simple",
    flex: 1,
    renderCell: (row) => {
      return (
        <div className="flex gap-2.5">
          <span>{row?.Simple?.toFixed(2)}</span>
          {textColor(row.sign_simple)}
        </div>
      );
    },
  },
  {
    field: "Exponentiel",
    headerName: "Exponentiel",
    flex: 1,
    renderCell: (row) => {
      return (
        <div className="flex gap-2.5">
          <span>{row?.Exponentiel?.toFixed(2)}</span>
          {textColor(row.sign_expo)}
        </div>
      );
    },
  },
];
const columnsMoy = createColumns(moyDef);

// News
const newsDef = [
  {
    field: "libelle",
    headerName: "Libellé",
    flex: 0.3,
  },
  {
    field: "seance",
    headerName: "Séance",
    flex: 0.3,
    isDate: true,
  },
  {
    field: "titre",
    headerName: "Titre",
    flex: 1,
  },
];
const columnsNews = createColumns(newsDef);

//
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
