import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const d = {
  Classe_Mat: "CT",
  Var_taux_systematique: 0,
  date_final: "2024-03-25",
  code: "200709",
  Fourchette_Mat: "[0 , 1]",
  date_debut: "2024-02-25",
  nom_benchmark: "MBI CT",
  contrib_Residu_Period: -0.00013578447990095582,
  Diff_Perf: -0.00008700554586711117,
  perf_indice_cumul: 0.002275516134912836,
  date_beg: "2024-03-21",
  Portage_systematique: 0.000003854325758763766,
  Rbi: 0.00008345623907533366,
  Rbi_Cumul: 0.002362633749112497,
  Var_swap_period: 0,
  Wbi: 0.047367976496591746,
  Residu_Titre: 7.136658733459068e-8,
  portage_specifique_period: 0,
  date_max_fourchette: "2024-03-22",
  date_end: "2024-03-22",
  Residu_Titre_period: -0.0000023583956076035025,
  code_benchmark: 25,
  Ordre_Frch_Mat: 1,
  Residu_Titre_per: 0.0000013880400913023378,
  date_final_tit: "2024-03-22",
  Produit_perf: 1.002192092825269,
  Var_taux_systematique_period: 0.000003585874792518298,
  Variation_taux_specifique_period: 0,
  Maturite_end: 0.038356164383561646,
  Portage_systematique_period: 0.00009610483950663798,
  Portage_swap_spread_period: 0,
};

const axaBenchCols = [
  {
    field: "nom_benchmark",
    headerName: "Nom Bench",
  },
  {
    field: "date_debut",
    headerName: "Date début",
    isDate: true,
  },
  {
    field: "date_final",
    headerName: "Date final",
    isDate: true,
  },
  {
    field: "code",
    headerName: "Code Bench",
  },
  {
    field: "Maturite_end",
    headerName: "Maturite end",
    width: 100,
    isNum: true,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe_Mat",
    width: 100,
  },
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
    width: 100,
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    cellWidth: "70%",
    width: 90,
    isNum: true,
    isPerce: true,
  },
  {
    field: "Portage_systematique_period",
    headerName: "Portage systematique period",
    isPerce: true,
    isNum: true,
  },
  {
    field: "portage_specifique_period",
    headerName: "Portage specifique period",
    isPerce: true,
    isNum: true,
  },
  {
    field: "Var_taux_systematique",
    headerName: "Var taux systematique",
    isPerce: true,
    isNum: true,
  },
  {
    field: "Residu_Titre_per",
    headerName: "Residu Titre per",
    isPerce: true,
    isNum: true,
  },
  {
    field: "Residu_Titre_period",
    headerName: "Residu Titre period",
    isPerce: true,
    isNum: true,
  },
];

export const axaBench = createColumns(axaBenchCols);
const axaFields = [
  "Portage systematique",
  "Portage swap spread",
  "Portage specifique",
  "Var taux systematique",
  "Var swap",
  "Var taux specifique",
  "Residu",
];

export const axaBenchRes = [
  ...axaFields.map((field) => ({
    field,
    flex: 0.3,
    renderCell: ({ row }) => <span>{row[field]}%</span>,
  })),
  // {
  //   field: "Perf indice",
  //   flex: 0.3,
  //   renderCell: ({ row }) => {
  //     const values = axaFields.map((field) => row[field]);
  //     const value = values.reduce((sum, currentValue) => sum + currentValue, 0);
  //     console.log("Value", values);
  //     return <span>{value.toFixed(2)}%</span>;
  //   },
  // },
];

// CA BENCH
const caBenchCols = [
  {
    field: "nom_benchmark",
    headerName: "Nom bench",
    width: 150,
  },
  {
    field: "Maturite_end",
    headerName: "Maturite (Année)",
    isNum: true,
    width: 100,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe Mat",
    width: 100,
  },
  ,
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
    width: 100,
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    cellWidth: "70%",
    width: 90,
    isNum: true,
    isPerce: true,
  },
  {
    field: "Residu_Titre",
    headerName: "Residu Titre",
    isNum: true,
    isPerce: true,
    width: 120,
  },
  {
    field: "contrib_Residu_Period",
    headerName: "contrib Residu Period",
    isNum: true,
    isPerce: true,
    width: 160,
  },
  {
    field: "effet_coupon_period",
    headerName: "effet coupon period",
    isNum: true,
    isPerce: true,
    width: 160,
  },
  {
    field: "effet_amortissement_period",
    headerName: "effet amortissement period",
    isNum: true,
    isPerce: true,
  },
  {
    field: "effet_niveau_period",
    headerName: "effet niveau period",
    isNum: true,
    isPerce: true,
    width: 160,
  },
  {
    field: "effet_courbe_period",
    headerName: "effet courbe period",
    isNum: true,
    isPerce: true,
    width: 160,
  },
  {
    field: "effet_spread_period",
    headerName: "effet spread period",
    isNum: true,
    isPerce: true,
    width: 160,
  },
];

export const caBench = createColumns(caBenchCols);

const caFields = [
  "Effet coupon",
  "Effet amortissement",
  "Effet niveau",
  "Effet courbe",
  "Effet spread",
  "Residu",
  "Perf indice",
];

export const caBenchdRes = [
  ...caFields.map((field) => ({
    field,
    flex: 0.3,
    renderCell: ({ row }) => <span>{row[field]}%</span>,
  })),
  // {
  //   field: "Perf indice",
  //   flex: 0.3,
  //   renderCell: ({ row }) => {
  //     const values = caFields.map((field) => row[field]);
  //     const value = values.reduce((sum, currentValue) => sum + currentValue, 0);
  //     console.log("Value", values, row, "value is", value);
  //     return <span>{value.toFixed(2)}%</span>;
  //   },
  // },
];

const statproBenchCols = [
  {
    field: "nom_benchmark",
    headerName: "Nom bench",
  },
  {
    field: "Maturite_end",
    headerName: "Maturite (Année)",
    width: 170,
    isNum: true,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe Mat",
    width: 100,
  },
  ,
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
    width: 100,
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    cellWidth: "70%",
    width: 90,
    isNum: true,
    isPerce: true,
  },
  {
    field: "effet_Taux_act_period",
    headerName: "effet Taux act period",
    isNum: true,
    isPerce: true,
  },
  {
    field: "effet_Courbe_period",
    headerName: "effet courbe period",
    isNum: true,
    isPerce: true,
  },
  {
    field: "effet_Spread_period",
    headerName: "effet spread period",
    isNum: true,
    isPerce: true,
  },
  {
    field: "effet_Convexite_period",
    headerName: "effet Convexite period",
    isNum: true,
    isPerce: true,
  },
];

export const statPro = createColumns(statproBenchCols);

const statProFields = [
  "Effet taux act period",
  "Effet courbe period",
  "Effet spread period",
  "Effet convexite period",
  "Residu",
  "Perf indice",
];

export const statProRes = [
  ...statProFields.map((field) => ({
    field,
    flex: 0.3,
    renderCell: ({ row }) => <span>{row[field]}%</span>,
  })),
];
const a = {
  SEANCE_AVANT: "2024-02-24T00:00:00.000+00:00",
  VARIATION: 0.00008540516588229075,
  NOM_INDICE: "MBI CT",
  VALEUR: 193.20419908344078,
  SEANCE: "2024-02-25T00:00:00.000+00:00",
  VALEUR_AVANT: 193.18769985588816,
};
const evolMBICols = [
  {
    field: "NOM_INDICE",
    headerName: "Nom indice",
    flex: 0.5,
  },
  {
    field: "SEANCE",
    headerName: "Séance",
    isDate: true,
  },
  {
    field: "VALEUR",
    headerName: "Valeur",
    isNum: true,
  },
  {
    field: "VARIATION",
    headerName: "Variation",
    isNum: true,
  },
  {
    field: "SEANCE_AVANT",
    headerName: "Séance avant",
    isDate: true,
  },
  {
    field: "VALEUR_AVANT",
    headerName: "Valeur avant",
    isNum: true,
    width: 100,
  },
];
export const evolMBI = createColumns(evolMBICols, false);

const evolMBIB100Cols = [
  {
    field: "NOM_INDICE",
    headerName: "Indice",
  },
  {
    field: "SEANCE",
    headerName: "Séance",
    isDate: true,
  },
  {
    field: "VALEUR_B100",
    headerName: "Valeur B100",
    isNum: true,
  },
];
export const evolMBIB100 = createColumns(evolMBIB100Cols);

const h = {
  INDICE: "MBI CT",
  DATE: "2024-02-28",
  YTM: 0.030963486113290015,
  COUPON: 0.03135422122516252,
  MOY_DURATION: 0.3937691358981163,
  DURATION: 0.4060794134519573,
};

const mbiFieldsCols = [
  { field: "DATE", headerName: "Date", isDate: true },
  { field: "INDICE", headerName: "Indice" },
  { field: "DURATION", headerName: " DURATION", isNum: true },
  { field: "MOY_DURATION", headerName: "MOY DURATION", isNum: true },
  { field: "YTM", headerName: "YTM", isNum: true, isPerce: true },
  { field: "COUPON", headerName: "COUPON", isNum: true, isPerce: true },
];
export const mbiFields = createColumns(mbiFieldsCols);

const comp = {
  VALORISATION: 100849.33,
  NOMINAL: 100000.0,
  TAUX_RENDEMENT: 0.0303,
  TOTAL_VALO: 7.5319625433e9,
  MATURITE_RESIDUELLE: 0.30684931506849317,
  CLASSE: "Court terme",
  GISEMENT_MDH: 7562.2,
  TITRE: "201676",
  DATE_MATURITE: "2024-07-15T00:00:00.000+00:00",
  BDT: "2 ans",
  DATE_JOUISSANCE: "2022-01-31T00:00:00.000+00:00",
  DATE_VALO: "2024-03-25T00:00:00.000+00:00",
  TAUX_FACIAL: 0.018,
};

const compFinMBICols = [
  { field: "TITRE", headerName: "Titre" },
  { field: "BDT", headerName: "BDT", width: 150 },
  { field: "DATE_JOUISSANCE", headerName: "DATE JOUISSANCE", isDate: true },
  { field: "DATE_MATURITE", headerName: "DATE MATURITE", isDate: true },
  { field: "CLASSE", headerName: "Classe" },
  {
    field: "VALORISATION",
    headerName: "VALORISATION",
    isNum: true,
  },
  {
    field: "TAUX_RENDEMENT",
    headerName: "TAUX RENDEMENT",
    isNum: true,
    isPerce: true,
  },
  {
    field: "TAUX_FACIAL",
    headerName: "TAUX FACIAL",
    isNum: true,
    isPerce: true,
  },
  { field: "GISEMENT_MDH", headerName: "GISEMENT MDH", isNum: true },
  {
    field: "TOTAL_VALO",
    headerName: "TOTAL VALO MDH",
    isNum: true,
    isMill: true,
  },
  {
    field: "poids",
    headerName: "Poids",
    width: 92,
    isNum: true,
    isPerce: true,
  },
];
export const compFinMBI = createColumns(compFinMBICols);

const g = {
  A_N: "A",
  Code_ISIN: "MA0002018374",
  Ligne: "10 ans",
  Taux_Facial: 0.04,
  Date_Maturite: "2034-09-18",
  Date_Emission: "2024-01-02",
  Date_Effet: "2024-03-04",
  Mois: "févr-24",
  Nature_Echange: "OPR PRIMAIRE",
  Nominal: 100000.0,
  Gisement_MDH: 2642.1,
  Code_Echange: 3,
};
const opeGisementsCols = [
  { field: "Ligne", headerName: "Ligne", width: 160 },
  { field: "A_N", headerName: "A_N", width: 60 },
  { field: "Code_ISIN", headerName: "Code_ISIN" },
  { field: "Date_Emission", headerName: "Date Emission", isDate: true },
  { field: "Date_Maturite", headerName: "Date_Maturite", isDate: true },
  {
    field: "Taux_Facial",
    headerName: "Taux Facial",
    isNum: true,
    isPerce: true,
  },
  { field: "Gisement_MDH", headerName: "Gisement MDH", isNum: true },
  { field: "Date_Effet", headerName: "Date Effet", isDate: true },
  // { field: "Mois", headerName: "Mois" },
  // { field: "Nature_Echange", headerName: "Nature_Echange" },
  // { field: "Nominal", headerName: "Nominal" },
  // { field: "Code_Echange", headerName: "Code_Echange" },
];
export const operGisements = createColumns(opeGisementsCols);

function createColumns(cols, isAlign = true) {
  return cols.map((col, index) => {
    const flex = col?.flex ? { flex: col?.flex } : {};
    const withPerce = col?.isPerce;
    const isMill = col?.isMill;
    const cellWidth = col?.cellWidth ?? "50%";
    const style = isAlign
      ? {
          minWidth: cellWidth,
        }
      : {};
    const def = {
      field: col.field,
      headerName: `${col.headerName}`,
      width: col?.width ?? 200,
      ...flex,
      renderCell: ({ row }) => {
        let value = row[col.field];
        if (col?.isDate) {
          value = moment(value).format("DD/MM/YYYY");
        } else if (col?.isNum) {
          value = withPerce ? value * 100 : value;
          value = isMill ? value / 1e6 : value;
          value = parseFloat(value?.toFixed(2));
          value = formatNumberWithSpaces(value);
        }
        return index > 0 ? (
          <span className={`text-right`} style={style}>
            {value}
            {withPerce ? "%" : ""}
          </span>
        ) : (
          <strong>
            {value}
            {withPerce ? "%" : ""}
          </strong>
        );
      },
    };
    return def;
  });
}
