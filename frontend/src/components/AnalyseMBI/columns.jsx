import moment from "moment";

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

export const axaBench = [
  {
    field: "nom_benchmark",
    headerName: "Nom Bench",

    renderCell: ({ row }) => <strong>{row.nom_benchmark}</strong>,
  },
  {
    field: "date_debut",
    headerName: "Date début",

    renderCell: ({ row }) => (
      <span>{moment(row.date_beg).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    field: "date_final",
    headerName: "Date final",

    renderCell: ({ row }) => (
      <span>{moment(row.date_final).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    field: "code",
    headerName: "Code Bench",
  },
  {
    field: "Maturite_end",
    headerName: "Maturite end",
    renderCell: ({ row }) => <span>{row.Maturite_end.toFixed(2)}</span>,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe_Mat",
  },
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    renderCell: ({ row }) => <span>{row.Wbi.toFixed(2)}</span>,
  },
  {
    field: "Portage_systematique_period",
    headerName: "Portage systematique period",
    renderCell: ({ row }) => (
      <span>{row.Portage_systematique_period.toFixed(2)}</span>
    ),
  },
  {
    field: "Portage_swap_spread_period",
    headerName: "Portage swap spread period",
    renderCell: ({ row }) => (
      <span>{row.Portage_swap_spread_period.toFixed(2)}</span>
    ),
  },
  {
    field: "portage_specifique_period",
    headerName: "Portage specifique period",
    renderCell: ({ row }) => (
      <span>{row.portage_specifique_period.toFixed(2)}</span>
    ),
  },
  {
    field: "Var_taux_systematique",
    headerName: "Var taux systematique",
    renderCell: ({ row }) => (
      <span>{row.Var_taux_systematique.toFixed(2)}</span>
    ),
  },
  {
    field: "Var_swap_period",
    headerName: "Var swap period",
    renderCell: ({ row }) => <span>{row.Var_swap_period.toFixed(2)}</span>,
  },
  {
    field: "Variation_taux_specifique_period",
    headerName: "Variation taux specifique period",
    renderCell: ({ row }) => (
      <span>{row.Variation_taux_specifique_period.toFixed(2)}</span>
    ),
  },
  {
    field: "Residu_Titre_per",
    headerName: "Residu Titre per",
    renderCell: ({ row }) => <span>{row.Residu_Titre_per.toFixed(2)}</span>,
  },
  {
    field: "Diff_Perf",
    headerName: "Diff Perf",
    renderCell: ({ row }) => <span>{row.Diff_Perf.toFixed(2)}</span>,
  },
  {
    field: "Residu_Titre_period",
    headerName: "Residu Titre period",
    renderCell: ({ row }) => <span>{row.Residu_Titre_period.toFixed(2)}</span>,
  },
];

const axaFields = [
  "Portage systematique",
  "Portage swap spread",
  "Portage specifique",
  "Var taux systematique",
  "Var swap",
  "Var taux specifique",
  "Perf indice",
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
    field: "code_benchmark",
    headerName: "code",
  },
  {
    field: "Maturite_end",
    headerName: "Maturite end",
    isNum: true,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe Mat",
  },
  ,
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    isNum: true,
  },
  {
    field: "effet_coupon",
    headerName: "effet coupon",
    isNum: true,
  },
  {
    field: "effet_amortissement",
    headerName: "effet amortissement",
    isNum: true,
  },
  {
    field: "effet_niveau",
    headerName: "effet niveau",
    isNum: true,
  },
  {
    field: "effet_courbe",
    headerName: "effet courbe",
    isNum: true,
  },
  {
    field: "effet_spread",
    headerName: "effet spread",
    isNum: true,
  },
  {
    field: "Residu_Titre",
    headerName: "Residu Titre",
    isNum: true,
  },
  {
    field: "contrib_Residu_Period",
    headerName: "contrib Residu Period",
    isNum: true,
  },
  {
    field: "perf_indice_cumul",
    headerName: "perf indice cumul",
    isNum: true,
  },
  {
    field: "Produit_perf",
    headerName: "Produit perf",
    isNum: true,
  },
  {
    field: "effet_coupon_period",
    headerName: "effet coupon period",
    isNum: true,
  },
  {
    field: "effet_amortissement_period",
    headerName: "effet amortissement period",
    isNum: true,
  },
  {
    field: "effet_niveau_period",
    headerName: "effet niveau period",
    isNum: true,
  },
  {
    field: "effet_courbe_period",
    headerName: "effet courbe period",
    isNum: true,
  },
  {
    field: "effet_spread_period",
    headerName: "effet spread period",
    isNum: true,
  },
  {
    field: "Residu_Titre_per",
    headerName: "Residu Titre per",
    isNum: true,
  },
  {
    field: "Diff_Perf",
    headerName: "Diff Perf",
    isNum: true,
  },
  {
    field: "Residu_Titre_period",
    headerName: "Residu Titre period",
    isNum: true,
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
    field: "code_benchmark",
    headerName: "code",
  },
  {
    field: "Maturite_end",
    headerName: "Maturite end",
    isNum: true,
  },
  {
    field: "Classe_Mat",
    headerName: "Classe Mat",
  },
  ,
  {
    field: "Fourchette_Mat",
    headerName: "Fourchette",
  },
  {
    field: "Wbi",
    headerName: "Wbi",
    isNum: true,
  },
  {
    field: "effet_Taux_act_period",
    headerName: "effet Taux act period",
    isNum: true,
  },
  {
    field: "effet_Courbe_period",
    headerName: "effet courbe period",
    isNum: true,
  },
  {
    field: "effet_Spread_period",
    headerName: "effet spread period",
    isNum: true,
  },
  {
    field: "effet_Convexite_period",
    headerName: "effet Convexite period",
    isNum: true,
  },
  {
    field: "Residu_Titre_period",
    headerName: "Residu Titre period",
    isNum: true,
  },
  {
    field: "perf_indice_cumul",
    headerName: "perf indice cumul",
    isNum: true,
  },
];

export const statPro = createColumns(statproBenchCols);
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
  },
];
export const evolMBI = createColumns(evolMBICols);

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
  { field: "YTM", headerName: "YTM", isNum: true },
  { field: "COUPON", headerName: "COUPON", isNum: true },
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
  { field: "BDT", headerName: "BDT" },
  { field: "DATE_JOUISSANCE", headerName: "DATE JOUISSANCE", isDate: true },
  { field: "DATE_MATURITE", headerName: "DATE MATURITE", isDate: true },
  { field: "CLASSE", headerName: "Classe" },
  { field: "VALORISATION", headerName: "VALORISATION", isNum: true },
  { field: "TAUX_RENDEMENT", headerName: "TAUX RENDEMENT", isNum: true },
  { field: "TAUX_FACIAL", headerName: "TAUX FACIAL", isNum: true },
  { field: "GISEMENT_MDH", headerName: "GISEMENT MDH", isNum: true },
  { field: "TOTAL_VALO", headerName: "TOTAL VALO", isNum: true },
  { field: "poids", headerName: "Poids (%)", isNum: true },
];
export const compFinMBI = createColumns(compFinMBICols);

function createColumns(cols) {
  return cols.map((col) => {
    const flex = col?.flex ? { flex: col?.flex } : {};
    const def = {
      field: col.field,
      headerName: col.headerName,
      width: 200,
      renderCell: ({ row }) => {
        let value = row[col.field];
        if (col?.isDate) {
          value = moment(value).format("DD/MM/YYYY");
        } else if (col?.isNum) value = parseFloat(value?.toFixed(2));
        return <span>{value}</span>;
      },
    };
    return def;
  });
}
