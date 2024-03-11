import moment from "moment";

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
export const libelleColumns = [
  {
    field: "LIBELLE",
    headerName: "Libellé",
    width: 360,
    flex: 0.5,
    renderCell: ({ row }) => {
      return <span className="font-semibold">{row.LIBELLE}</span>;
    },
  },
  {
    field: "SIMULE",
    headerName: "Simulé",
    width: 360,
    flex: 0.3,
    renderCell: ({ row }) => {
      return <span className="font-semibold">{row.SIMULE ?? "NULL"}</span>;
    },
  },
  {
    field: "Poids",
    headerName: "Poids(%)",
    width: 360,
    flex: 0.2,
    renderCell: ({ row }) => {
      return <span className="font-semibold">{row.Poids.toFixed(2)}%</span>;
    },
  },
];
export const simColumns = [
  {
    field: "titre",
    headerName: "Titre",
    width: 360,
    flex: 0.5,
    renderCell: ({ row }) => {
      return <span className="font-semibold">{row.titre}</span>;
    },
  },
  {
    field: "Poids",
    headerName: "Poids(%)",
    width: 360,
    flex: 0.5,
    renderCell: ({ row }) => {
      return <span className="font-semibold">{row.Poids.toFixed(2)}%</span>;
    },
  },
];
export const columns = [
  {
    field: "date",
    headerName: "Date de composition",
    width: 360,
    flex: 0.5,
    renderCell: ({ row }) => {
      return <span>{moment(row.date).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    field: "Gestionnaire",
    headerName: "Gestionnaire",
    width: 360,
    flex: 0.5,
  },
  {
    field: "OPCVM",
    headerName: "OPCVM",
    width: 360,
    flex: 0.5,
  },
  {
    field: "Classification",
    headerName: "Classification",
    width: 360,
    flex: 0.5,
  },
];
