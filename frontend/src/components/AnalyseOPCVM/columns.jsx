import { Typography } from "@mui/material";
import TextColor from "../Dashboard/TextColor";
import RenderStarsWithRating from "../Markowitz/RenderStarsWithRating";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { createColumns } from "../../utils/createColumns";

// Perfeormance
const perfDef = [
  {
    field: "perf",
    headerName: "Performance",
    flex: 0.3,
  },
  {
    field: "perf_opc",
    headerName: "Fonds",
    flex: 0.3,
    renderCell: (row) => {
      const value = row.perf_opc;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_bench",
    headerName: "Benchmark",
    flex: 0.3,
    renderCell: (row) => {
      const value = row.perf_bench;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_classe",
    headerName: "Catégorie",
    flex: 0.3,
    renderCell: (row) => {
      const value = row.perf_classe;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
];
export const performanceColumns = createColumns(perfDef);

export const loeilExpertColumns = [
  {
    field: "indicateur",
    headerName: "Valeur à 3 ans",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.indicateur}</strong>,
  },
  {
    field: "",
    headerName: "Par rapport à la Cat",
    flex: 1,
    renderCell: (params) => {
      const value = params.row.valeur;
      const echelle = params.row.echelle;
      return (
        <div className="flex gap-3 ">
          <Typography
            variant="body2"
            className="mr-3 font-semibold min-w-[90px] text-right"
          >
            {formatNumberWithSpaces(value?.toFixed(2))}
          </Typography>
          <RenderStarsWithRating
            value={value}
            ratingBy={echelle}
            getStarRating={loeilExpertRating}
            ratingIcon="square"
            color="var(--primary-color)"
          />
          <span>{echelle}</span>
        </div>
      );
    },
  },
];

export const indicateursRisqueColumns = [
  {
    field: "indicateur",
    headerName: "Valeur à 3 ans",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.indicateur}</strong>,
  },
  {
    field: "",
    headerName: "Par rapport à la Cat",
    flex: 1,
    renderCell: (params) => {
      const value = params.row.valeur;
      const echelle = params.row.echelle;
      return (
        <div className="flex gap-3 ">
          <Typography
            variant="body2"
            className="mr-3 font-semibold min-w-[90px] text-right"
          >
            {formatNumberWithSpaces(value?.toFixed(2))}
          </Typography>
          <RenderStarsWithRating
            value={value}
            ratingBy={echelle}
            getStarRating={loeilExpertRating}
            ratingIcon="square"
            color="var(--primary-color)"
          />
          <span>{echelle}</span>
        </div>
      );
    },
  },
];

export const barometreColumns = [
  {
    field: "marche",
    headerName: "Marché",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.marche}</strong>,
  },
  {
    field: "classement",
    headerName: "Classement",
    flex: 0.3,
    renderCell: (params) => {
      const quantile = params.row.quintile; // Quantile (numérique attendu)
      const marche = params.row.marche; // Libellé du marché

      return (
        <div className="flex gap-3 items-center">
          
          {/* Affichage des étoiles ou icônes selon le quantile */}
          <RenderStarsWithRating
            value={quantile} // Passer le quantile directement
            ratingBy={quantile}
            getStarRating={barometreRating}
            ratingIcon="square"
            color="var(--primary-color)"
            invertColors={true}
          />
        </div>
      );
    },
  },
];
const t = [
  {
    quartile: 4,
    perf: "1 mois",
    rang: "110/111",
  },
];

export const classementPerfColumns = [
  {
    field: "perf",
    headerName: "Performance",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.perf}</strong>,
  },
  {
    field: "rang",
    headerName: "Rang",
    flex: 0.3,
  },
  {
    field: "quartile",
    headerName: "Quartile",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.quartile;
      return (
        <div className="flex gap-3">
          <Typography variant="body2" className="font-semibold">
            {value}
          </Typography>
          <RenderStarsWithRating
            value={value}
            getStarRating={classementPerfRating}
            ratingIcon="square"
            starsNumber={4}
            className="flex flex-row-reverse"
            color="var(--primary-color)"
          />
        </div>
      );
    },
  },
];

// SIDEWAYS MARKET
const sidewaysDef = [
  {
    field: "sideways_ab",
    headerName: "Absolue",
    flex: 0.3,
  },
  {
    field: "sideways_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (row) => row.sideways_re?.toFixed(2) + "%",
  },
];
export const sidewaysColumns = createColumns(sidewaysDef);

// BEAR MARKET
const bearDef = [
  {
    field: "bear_ab",
    headerName: "Absolue",
    flex: 0.3,
  },
  {
    field: "bear_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (row) => row.bear_re?.toFixed(2) + "%",
  },
];
export const bearColumns = createColumns(bearDef);

// BEAR MARKET
const bullDef = [
  {
    field: "bull_ab",
    headerName: "Absolue",
    flex: 0.3,
  },
  {
    field: "bull_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (row) => row.bull_re?.toFixed(2) + "%",
  },
];
export const bullColumns = createColumns(bullDef);

const classementPerfRating = (value) => {
  switch (value) {
    case 4:
      return 4;
    case 3:
      return 3;
    case 2:
      return 2;
    
      case 1:
        return 1;
  }
};
const loeilExpertRating = (value) => {
  switch (value) {
    case "Très bon":
      return 5;
    case "Bon":
      return 4;
    case "Moyen":
      return 3;
      case "Mauvais":
      return 2;

      case "Très mauvais":
        return 1;
  }
};
// Fonction inchangée mais simple
const barometreRating = (quantile) => {
  // Retourne directement le quantile comme rating si c'est un nombre
  return typeof quantile === "number" ? quantile : 0;
};