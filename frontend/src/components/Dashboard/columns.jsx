import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import TextColor from "./TextColor";

const PERFORMANCE_DU_MARCHE = [
  {
    field: "Indices",
    headerName: "Indices",
    flex: 1,
    renderCell: (params) => <strong>{params.row.Indices}</strong>,
  },
  {
    field: "Valeur",
    headerName: "Valeur",
    align: "center",
    headerAlign: "center",
    flex: 0.5,
    renderCell: (params) => {
      const val = params.row?.Valeur?.toFixed(2);
      return (
        <span className="min-w-[90px] text-right">
          {formatNumberWithSpaces(val)}
        </span>
      );
    },
  },
  {
    field: "perf_prec",
    headerName: "Perf Hebdo",
    flex: 0.5,

    renderCell: (params) => {
      const num = params.row.perf_prec * 100;
      const val = num.toFixed(2);
      return <TextColor value={val} />;
    },
  },
  {
    field: "perf_ytd",
    headerName: "Perf YTD",
    flex: 0.5,
    renderCell: (params) => {
      const num = params.row.perf_ytd * 100;
      const val = num.toFixed(2);
      return <TextColor value={val} />;
    },
  },
];
const VOLUME_PAR_MARCHE = [
  {
    field: "marche",
    headerName: "Marché",
    flex: 1,
    renderCell: (params) => <strong>{params.row.marche}</strong>,
  },
  {
    field: "Volume",
    headerName: "Volume (MMAD)",
    flex: 1,
    renderCell: (params) => {
      const val = params.row?.Volume / 1e6;
      return formatNumberWithSpaces(val.toFixed(2));
    },
  },
  {
    field: "perf",
    headerName: "Poids",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.perf * 100;
      return val.toFixed(2) + "%";
    },
  },
  {
    field: "vqm",
    headerName: "VQM (MMAD)",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.vqm / 1e6;
      return formatNumberWithSpaces(val.toFixed(2));
    },
  },
];
const PRINCIPAUX_VOLUMES_MC = [
  {
    field: "INSTRUMENT",
    headerName: "Instrument",
    flex: 1,
    renderCell: (params) => <strong>{params.row.INSTRUMENT}</strong>,
  },
  {
    field: "COURS",
    headerName: "Cours",
    flex: 1,
    renderCell: (params) => {
      return (
        <span className="max-w-[90px] min-w-[90px] text-right">
          {params.row?.COURS?.toFixed(2)}
        </span>
      );
    },
  },
  {
    field: "QUANTITE",
    headerName: "Quantité",
    flex: 1,
    renderCell: (params) => {
      return (
        <span className="max-w-[90px] min-w-[90px] text-right">
          {formatNumberWithSpaces(params.row.QUANTITE)}
        </span>
      );
    },
  },
  {
    field: "VOLUME",
    headerName: "Volume",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.VOLUME / 1e6;
      return formatNumberWithSpaces(val.toFixed(2));
    },
  },
  {
    field: "poids",
    headerName: "Poids",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.poids;
      return val.toFixed(2) + "%";
    },
  },
];
const PRINCIPALES_VARIATIONS = [
  {
    field: "LIBELLE",
    headerName: "Libelle",
    flex: 1,
    renderCell: (params) => <strong>{params.row.LIBELLE}</strong>,
  },
  {
    field: "COURS",
    headerName: "Cours",
    flex: 1,
    renderCell: (params) => {
      return (
        <span className="max-w-[90px] min-w-[60px] text-right">
          {params.row?.COURS?.toFixed(2)}
        </span>
      );
    },
  },
  {
    field: "perf_prec",
    headerName: "Perf (1s) ",
    flex: 1,
    renderCell: (params) => {
      const val = (params.row.perf_prec * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
  {
    field: "contrib_prec",
    headerName: "Contrib (1s) ",
    flex: 1,
    renderCell: (params) => {
      const val = (params.row.contrib_prec * 100).toFixed(3);
      return <TextColor value={val} />;
    },
  },
  {
    field: "perf_ytd",
    headerName: "Perf (YTD)",
    flex: 1,
    renderCell: (params) => {
      const val = (params.row.perf_ytd * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
  {
    field: "contrib_YTD",
    headerName: "Contrib (YTD)",
    flex: 1,
    renderCell: (params) => {
      const val = (params.row.contrib_YTD * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
];
const TITRES_PLUS_ECHANGES = [
  {
    field: "valeur",
    headerName: "Société",
    flex: 1,
    renderCell: (params) => <strong>{params.row.valeur}</strong>,
  },
  {
    field: "volume",
    headerName: "Volume en (MMAD)",
    flex: 1,
    // align: "center",
    renderCell: (params) => {
      const val = params.row.volume / 1e6;
      return (
        <span className="min-w-[90px] text-right">
          {formatNumberWithSpaces(val.toFixed(2))}
        </span>
      );
    },
  },
  {
    field: "Cours_Cloture",
    headerName: "Dernier cours en (DH)",
    flex: 1,
    renderCell: (params) => {
      return (
        <span className="min-w-[90px] text-right">
          {formatNumberWithSpaces(params.row.Cours_Cloture)}
        </span>
      );
    },
  },
  {
    field: "variation",
    headerName: "Variation Hebdomadaire",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.variation * 100;

      return (
        <span className="min-w-[90px] text-right">
          {<TextColor value={val.toFixed(2)} />}
        </span>
      );
    },
  },
];
const PLUS_FORTES_HAUSSES_BAISSES_VOLUME = [
  {
    field: "Société",
    headerName: "Société",
    flex: 1,
    sortable: false,
    renderCell: (params) => <strong>{params.row.Société}</strong>,
  },
  {
    field: "Volume_moyen_YTD",
    headerName: "Volume moyen Hebdo YTD (MMAD)",
    flex: 1,
    align: "center",
    renderCell: (params) => {
      const val = params.row.Volume_moyen_YTD / 1e6;
      return (
        <span className="max-w-[90px] min-w-[60px] text-right">
          {formatNumberWithSpaces(val.toFixed(2))}
        </span>
      );
    },
  },
  {
    field: "Volume",
    headerName: "Volume Hebdo (MMAD)",
    flex: 1,
    renderCell: (params) => {
      const val = params.row.Volume / 1e6;

      return (
        <span className="max-w-[90px] min-w-[60px] text-right">
          {formatNumberWithSpaces(val.toFixed(2))}
        </span>
      );
    },
  },
  {
    field: "variation",
    headerName: "Variation",
    flex: 0.5,
    renderCell: (params) => params.row.variation.toFixed(2),
  },
  {
    field: "perf",
    headerName: "Perf sur 1 semaine (%)",
    flex: 0.8,
    renderCell: (params) => {
      const val = (params.row.perf * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
];
const PLUS_FORTES_VARIATIONS = [
  {
    field: "valeur",
    headerName: "Société",
    flex: 1,
    renderCell: (params) => (
      <strong title={`${params.row.valeur}`}>{params.row.valeur}</strong>
    ),
  },
  {
    field: "Cours_Cloture",
    headerName: "Cours",
    flex: 0.5,
    renderCell: (params) => {
      return (
        <span className="max-w-[90px] min-w-[60px] text-right">
          {formatNumberWithSpaces(params.row.Cours_Cloture)}
        </span>
      );
    },
  },
  {
    field: "variation",
    headerName: "Variation Hebdo( %)",
    flex: 1,
    renderCell: (params) => {
      const val = (params.row.variation * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
  {
    field: "volume",
    headerName: "Volume (MMAD)",
    flex: 0.5,
    renderCell: (params) => (params.row.volume / 1e6).toFixed(2),
  },
];
const STATISTIQUES_SOCIETES = [
  {
    field: "s",
    headerName: "",
    flex: 1,
    renderCell: (params) => <strong>{params.row.s}</strong>,
  },
  {
    field: "sur_periode",
    headerName: "Sur la semaine",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => formatNumberWithSpaces(params.row.sur_periode),
  },
  {
    field: "depuis_debut_annee",
    headerName: "Depuis le début d'année",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      return params.row.depuis_debut_annee;
    },
  },
];
const STATISTIQUES_SOCIETES_2 = [
  {
    field: "sur_52_semaines",
    headerName: "Sur 52 semaines",
    flex: 1,
    renderCell: (params) => <strong>{params.row.sur_52_semaines}</strong>,
  },
  {
    field: "Nbre_Societes",
    headerName: "Nbre de Sociétés",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => params.row.Nbre_Societes,
  },
];
const SECTEURS = [
  {
    field: "secteur",
    headerName: "Secteur",
    flex: 2,
    renderCell: (params) => <strong>{params.row.secteur}</strong>,
  },
  {
    field: "valeur",
    headerName: "Valeur",
    flex: 0.5,
    renderCell: (params) => {
      const val = params.row.valeur.toFixed(2);
      return (
        <span className="max-w-[90px] min-w-[60px] text-right">
          {formatNumberWithSpaces(val)}
        </span>
      );
    },
  },
  {
    field: "perf_prec",
    headerName: "Variation",
    flex: 0.5,
    renderCell: (params) => (params.row.perf_prec * 100).toFixed(2) + "%",
  },
  {
    field: "perf_ytd",
    headerName: "Performance YTD",
    flex: 0.5,
    renderCell: (params) => {
      const val = (params.row.perf_ytd * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
];
export {
  PERFORMANCE_DU_MARCHE,
  VOLUME_PAR_MARCHE,
  PRINCIPAUX_VOLUMES_MC,
  PRINCIPALES_VARIATIONS,
  TITRES_PLUS_ECHANGES,
  PLUS_FORTES_HAUSSES_BAISSES_VOLUME,
  PLUS_FORTES_VARIATIONS,
  STATISTIQUES_SOCIETES,
  STATISTIQUES_SOCIETES_2,
  SECTEURS,
};
