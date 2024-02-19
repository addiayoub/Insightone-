import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import TextColor from "../Dashboard/TextColor";
// {
//     "Date_valeur": "2023-12-20T23:00:00.000+00:00",
//     "taux": 3,
//     "Date_Echeance": "2024-01-17T23:00:00.000+00:00",
//     "montant_servi": 1328
// }
// {
//     "Coupon": 4.3,
//     "Taux Min": 4.2299,
//     "Taux Max": 4.3164,
//     "Taux limite": 4.2754,
//     "%": 64,
//     "TMP": 4.2567,
//     "Proposé": 2253,
//     "Retenu": 1443,
//     "SEANCE": "2023-09-01T23:00:00.000+00:00",
//     "Echéance": "2034-06-18T23:00:00.000+00:00",
//     "Maturité": "10 ans"
// }

export const leveesTresorColumns = [
  {
    field: "Maturité",
    headerName: "Maturité",
    width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row["Maturité"]}</strong>,
  },
  {
    field: "Echéance",
    headerName: "Echéance",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.Echéance;
      return value ? <strong>{moment(value).format("DD/MM/YYYY")}</strong> : "";
    },
  },
  {
    field: "Coupon",
    headerName: "Coupon",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.Coupon;
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Proposé",
    headerName: "Proposé",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.Proposé);
      return value ?? "";
    },
  },
  {
    field: "Taux Min",
    headerName: "Taux Min",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row["Taux Min"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Taux Max",
    headerName: "Taux Max",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row["Taux Max"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Retenu",
    headerName: "Retenu",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.Retenu);
      return value ?? "";
    },
  },
  {
    field: "Taux limite",
    headerName: "Taux limite",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row["Taux limite"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "TMP",
    headerName: "TMP",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row["TMP"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "%",
    headerName: "%",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row["%"];
      return value !== null ? value + "%" : "";
    },
  },
];

export const pensionLivreeColumns = [
  {
    field: "date_valeur",
    headerName: "Du",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.date_valeur).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "Date_Echeance",
    headerName: "Au",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_Echeance).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "montant_servi",
    headerName: "Montant",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.montant_servi);
      return value;
    },
  },
  {
    field: "taux",
    headerName: "Taux",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.taux;
      return value + "%";
    },
  },
];

export const placementsTresorJColumns = [
  {
    field: "seance",
    headerName: "Séance",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.seance).format("dddd D MMMM YYYY")}</strong>
    ),
  },
  {
    field: "Montant_jour",
    headerName: "Montant",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.Montant_jour);
      return value;
    },
  },
];

export const placementsTresorColumns = [
  {
    field: "DATE_REGLEMENT",
    headerName: "Du",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.DATE_REGLEMENT).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "DATE_ECHEANCE",
    headerName: "Au",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_Echeance).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "MONTANT_PLACE",
    headerName: "Montant",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.MONTANT_PLACE);
      return value;
    },
  },
  {
    field: "DUREE",
    headerName: "Durée",
    width: 200,
    flex: 0.5,
  },
];

export const pretsGarantisColumns = [
  {
    field: "Date_valeur",
    headerName: "Du",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_valeur).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "Date_Echeance",
    headerName: "Au",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_Echeance).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "montant_servi",
    headerName: "Montant",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.montant_servi);
      return value;
    },
  },
  {
    field: "taux",
    headerName: "Taux",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.taux;
      return value + "%";
    },
  },
];

export const avance7jColumns = [
  {
    field: "Date_valeur",
    headerName: "Du",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_valeur).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "Date_Echeance",
    headerName: "Au",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{moment(params.row.Date_Echeance).format("DD/MM/YYYY")}</strong>
    ),
  },
  {
    field: "propose",
    headerName: "Propose",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.propose);
      return value;
    },
  },
  {
    field: "retenu",
    headerName: "Retenu",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = formatNumberWithSpaces(params.row.retenu);
      return value;
    },
  },
  {
    field: "variation",
    headerName: "Variation",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.variation;
      return (
        <TextColor
          {...{ value }}
          withoutArrow
          withSeparator
          textAlign="center"
        />
      );
    },
  },
];
export const tmpColumns = [
  {
    field: "periode",
    headerName: "Maturité",
    width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.periode}</strong>,
  },
  {
    field: "date_deb",
    headerName: "Date début",
    width: 200,
    flex: 0.5,
    renderCell: (params) => moment(params.row.date_deb).format("DD/MM/YYYY"),
  },
  {
    field: "date_fin",
    headerName: "Date début",
    width: 200,
    flex: 0.5,
    renderCell: (params) => moment(params.row.date_fin).format("DD/MM/YYYY"),
  },
  {
    field: "Moyenne",
    headerName: "Moyenne",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.Moyenne * 100;
      return value.toFixed(2) + "%";
    },
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    width: 200,
    flex: 0.5,
    renderCell: (params) => {
      const value = params.row.Volatilite * 100;
      return value.toFixed(2) + "%";
    },
  },
];
