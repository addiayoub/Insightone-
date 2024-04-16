import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import TextColor from "../Dashboard/TextColor";

const contribDef = [
  {
    field: "SECTEUR_ACTIVITE",
    headerName: "Secteur d'activité",
    width: 200,
    flex: 0.4,
  },
  {
    field: "titre",
    headerName: "Titre",
    flex: 0.3,
  },
  {
    field: "Contrib PTF rebalancé",
    headerName: "Contrib PTF rebalancé",
    flex: 0.3,
    renderCell: (row) => {
      const value = row["Contrib PTF rebalancé"] * 100;
      return <TextColor value={value} percentage />;
    },
  },
  {
    field: "Contrib PTF non rebalancé",
    headerName: "Contrib PTF non rebalancé",
    flex: 0.3,
    renderCell: (row) => {
      const value = row["Contrib PTF non rebalancé"] * 100;
      return <TextColor value={value} percentage />;
    },
  },
  {
    field: "Contribution rebalancement",
    headerName: "Contribution rebalancement",
    flex: 0.3,
    renderCell: (row) => {
      const value = row["Contribution rebalancement"] * 100;
      return <TextColor value={value} percentage fractionDigits={5} />;
    },
  },
];

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
    renderCell: (params) => {
      const value = params.row["Contrib PTF rebalancé"] * 100;
      return <TextColor value={value} percentage />;
    },
  },
  {
    field: "Contrib PTF non rebalancé",
    headerName: "Contrib PTF non rebalancé",
    width: 200,
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row["Contrib PTF non rebalancé"] * 100;
      return <TextColor value={value} percentage />;
    },
  },
  {
    field: "Contribution rebalancement",
    headerName: "Contribution rebalancement",
    width: 200,
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row["Contribution rebalancement"] * 100;
      return <TextColor value={value} percentage fractionDigits={5} />;
    },
  },
];

const divDif = [
  {
    field: "seance",
    headerName: "Séance",
    flex: 0.4,
    isDate: true,
  },
  {
    field: "titre",
    headerName: "Titre",
    flex: 0.3,
  },
  {
    field: "div_tot",
    headerName: "div_tot",
    flex: 0.3,
    isNum: true,
  },
  {
    field: "qte_div",
    headerName: "qte_div",
    flex: 0.3,
    isNum: true,
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
