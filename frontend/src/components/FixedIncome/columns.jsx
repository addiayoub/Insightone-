import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import TextColor from "../Dashboard/TextColor";
import { createColumns } from "../../utils/createColumns";

// Levées du Trésor
const leveesTresorDef = [
  {
    field: "Maturité",
    headerName: "Maturité",
    flex: 0.5,
  },
  {
    field: "Echéance",
    headerName: "Echéance",
    flex: 0.5,
    renderCell: (row) => {
      const value = row.Echéance;
      return value ? <strong>{moment(value).format("DD/MM/YYYY")}</strong> : "";
    },
  },
  {
    field: "Coupon",
    headerName: "Coupon",
    flex: 0.5,
    renderCell: (row) => {
      const value = row.Coupon;
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Proposé",
    headerName: "Proposé",
    flex: 0.5,
    renderCell: (row) => {
      const value = formatNumberWithSpaces(row.Proposé);
      return value ?? "";
    },
  },
  {
    field: "Taux Min",
    headerName: "Taux Min",
    flex: 0.5,
    renderCell: (row) => {
      const value = row["Taux Min"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Taux Max",
    headerName: "Taux Max",
    flex: 0.5,
    renderCell: (row) => {
      const value = row["Taux Max"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "Retenu",
    headerName: "Retenu",
    flex: 0.5,
    renderCell: (row) => {
      const value = formatNumberWithSpaces(row.Retenu);
      return value ?? "";
    },
  },
  {
    field: "Taux limite",
    headerName: "Taux limite",
    flex: 0.5,
    renderCell: (row) => {
      const value = row["Taux limite"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "TMP",
    headerName: "TMP",
    flex: 0.5,
    renderCell: (row) => {
      const value = row["TMP"];
      return value !== null ? value + "%" : "";
    },
  },
  {
    field: "%",
    headerName: "%",
    flex: 0.5,
    renderCell: (row) => {
      const value = row["%"];
      return value !== null ? value + "%" : "";
    },
  },
];
export const leveesTresorColumns = createColumns(leveesTresorDef, false);

// Pension livrée
const pensionLivreeDef = [
  {
    field: "date_valeur",
    headerName: "Du",
    isDate: true,
    flex: 0.5,
  },
  {
    field: "Date_Echeance",
    headerName: "Au",
    isDate: true,
    flex: 0.5,
  },
  {
    field: "montant_servi",
    headerName: "Montant",
    isNum: true,
    flex: 0.5,
  },
  {
    field: "taux",
    headerName: "Taux",
    isPerce: true,
    flex: 0.5,
  },
];
export const pensionLivreeColumns = createColumns(pensionLivreeDef, false);

// Placements du Trésor par jour
const placementsTresorJDef = [
  {
    field: "seance",
    headerName: "Séance",
    isDate: true,
    renderCell: (row) => (
      <strong>{moment(row.seance).format("dddd D MMMM YYYY")}</strong>
    ),
  },
  {
    field: "Montant_jour",
    headerName: "Montant",
    isNum: true,
  },
];
export const placementsTresorJColumns = createColumns(
  placementsTresorJDef,
  false
);

// Placements hebdomadaires du Trésor
const placementsTresorDef = [
  {
    field: "DATE_REGLEMENT",
    headerName: "Du",
    flex: 0.5,
    isDate: true,
  },
  {
    field: "DATE_ECHEANCE",
    headerName: "Au",
    flex: 0.5,
    isDate: true,
  },
  {
    field: "MONTANT_PLACE",
    headerName: "Montant",
    isNum: true,
  },
  {
    field: "DUREE",
    headerName: "Durée",
    flex: 0.5,
  },
];
export const placementsTresorColumns = createColumns(
  placementsTresorDef,
  false
);

// Prêts garantis (M MAD)
const pretsGarantisDef = [
  { field: "Date_valeur", headerName: "Du", flex: 0.5, isDate: true },
  {
    field: "Date_Echeance",
    headerName: "Au",
    flex: 0.5,
    renderCell: (row) => (
      <strong>{moment(row.Date_Echeance).format("DD/MM/YYYY")}</strong>
    ),
  },
  { field: "montant_servi", headerName: "Montant", flex: 0.5, isNum: true },
  {
    field: "taux",
    headerName: "Taux",
    flex: 0.5,

    renderCell: (row) => {
      const value = row.taux;
      return value + "%";
    },
  },
];
export const pretsGarantisColumns = createColumns(pretsGarantisDef);

// Avances à 7 jours (M MAD)
const avance7jDef = [
  { field: "Date_valeur", headerName: "Du", flex: 0.5, isDate: true },
  { field: "Date_Echeance", headerName: "Au", flex: 0.5, isDate: true },
  { field: "propose", headerName: "Propose", flex: 0.5, isNum: true },
  { field: "retenu", headerName: "Retenu", flex: 0.5, isNum: true },
  {
    field: "variation",
    headerName: "Variation",
    flex: 0.5,
    isNum: true,
    renderCell: (row) => {
      const value = row.variation;
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
export const avance7jColumns = createColumns(avance7jDef, false);

// TMP interbancaire
const tmpDef = [
  {
    field: "periode",
    headerName: "Maturité",
    flex: 0.5,
  },
  {
    field: "date_deb",
    headerName: "Date début",
    flex: 0.5,
    isDate: true,
  },
  {
    field: "date_fin",
    headerName: "Date début",
    flex: 0.5,
    isDate: true,
  },

  {
    field: "Moyenne",
    headerName: "Moyenne",
    isNum: true,
    isPerce: true,
    flex: 0.3,
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    isNum: true,
    isPerce: true,
    flex: 0.3,
  },
];
export const tmpColumns = createColumns(tmpDef, false);
