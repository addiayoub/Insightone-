import moment from "moment";
import { createColumns } from "../../utils/createColumns";

const obj = {
  date: "2022-09-30T00:00:00.000Z",
  Gestionnaire: "RMA ASSET MANAGEMENT",
  OPCVM: "RMA EQUITY MARKET",
  Classification: "ACTIONS",
  FAMILLE: "LIQUIDITES",
  CLASSE: "LIQUIDITES",
  CATEGORIE: "LIQUIDITES",
  EMETTEUR: "",
  SECTEUR_BVC: "",
  SECTEUR_GICS: "",
  DEVISE: "MAD",
  GARANTIE: null,
  code: "50",
  LIBELLE: "TITRES RECUS EN PENSIONS",
  Quantité: 1,
  cours: 4000535.7,
  Valorisation: 4000535.7,
  SIMULE: "TMP",
  Poids: 0.053042292078822405,
};
// Composition
const libellDef = [
  {
    field: "LIBELLE",
    headerName: "Libellé",
    width: 360,
    flex: 0.5,
  },
  {
    field: "SIMULE",
    headerName: "Proxy",
    flex: 0.3,
    renderCell: (row) => {
      return <span className="font-semibold">{row.SIMULE ?? "NULL"}</span>;
    },
  },
  {
    field: "Poids",
    headerName: "Poids(%)",
    flex: 0.2,
    renderCell: (row) => {
      return <span className="font-semibold">{row.Poids.toFixed(2)}%</span>;
    },
  },
];
export const libelleColumns = createColumns(libellDef);

// Simulation
const simDef = [
  {
    field: "titre",
    headerName: "Proxy",
    flex: 1,
    renderCell: (row) => {
      return <span className="font-semibold">{row.titre}</span>;
    },
  },
  {
    field: "Poids",
    headerName: "Poids(%)",
    flex: 0.6,
    renderCell: (row) => {
      return <span className="font-semibold">{row.Poids.toFixed(2)}%</span>;
    },
  },
];
export const simColumns = createColumns(simDef);

// Allocation d'actifs
const def = [
  {
    field: "date",
    headerName: "Date de composition",
    flex: 0.5,
    isDate: true,
  },
  {
    field: "Gestionnaire",
    headerName: "Gestionnaire",
    flex: 0.5,
  },
  {
    field: "OPCVM",
    headerName: "OPCVM",
    flex: 0.5,
  },
  {
    field: "Classification",
    headerName: "Classification",
    flex: 0.5,
  },
];
export const columns = createColumns(def, false);
