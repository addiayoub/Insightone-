import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export const contribColumns = [
  {
    field: "SECTEUR_ACTIVITE",
    headerName: "Secteur d'activité",
    width: 200,
    flex: 0.4,
    renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
  },
  {
    field: "titre",
    headerName: "Titre",
    width: 200,
    flex: 0.3,
  },
  {
    field: "Contrib PTF rebalancé",
    headerName: "Contrib PTF rebalancé",
    width: 200,
    flex: 0.3,
    renderCell: (params) => params.row["Contrib PTF rebalancé"].toFixed(5),
  },
  {
    field: "Contrib PTF non rebalancé",
    headerName: "Contrib PTF non rebalancé",
    width: 200,
    flex: 0.3,
    renderCell: (params) => params.row["Contrib PTF non rebalancé"].toFixed(5),
  },
  {
    field: "Contribution rebalancement",
    headerName: "Contribution rebalancement",
    width: 200,
    flex: 0.3,
    renderCell: (params) => params.row["Contribution rebalancement"].toFixed(7),
  },
];

export const divColumns = [
  {
    field: "seance",
    headerName: "Séance",
    width: 200,
    flex: 0.4,
    renderCell: (params) => (
      <strong>{moment(params.row.seance).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "titre",
    headerName: "Titre",
    width: 200,
    flex: 0.3,
  },
  {
    field: "div_tot",
    headerName: "div_tot",
    width: 200,
    flex: 0.3,
    renderCell: (params) => formatNumberWithSpaces(params.row.div_tot),
  },
  {
    field: "qte_div",
    headerName: "qte_div",
    width: 200,
    flex: 0.3,
    renderCell: (params) => formatNumberWithSpaces(params.row.qte_div),
  },
];
