import { Typography } from "@mui/material";
import TextColor from "../Dashboard/TextColor";
import RenderStarsWithRating from "../Markowitz/RenderStarsWithRating";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export const performanceColumns = [
  {
    field: "perf",
    headerName: "Performance",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.perf}</strong>,
  },
  {
    field: "perf_opc",
    headerName: "Fonds",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_opc;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_bench",
    headerName: "Benchmark",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_bench;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
  {
    field: "perf_classe",
    headerName: "Catégorie",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.perf_classe;
      return <TextColor value={value} percentage textAlign="center" />;
    },
  },
];

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
    field: "",
    headerName: "Classement",
    flex: 0.3,
    renderCell: (params) => {
      const value = params.row.valeur;
      const marche = params.row.marche;
      return (
        <div className="flex gap-3 ">
          <RenderStarsWithRating
            value={null}
            ratingBy={marche}
            getStarRating={barometreRating}
            ratingIcon="square"
            color="var(--primary-color)"
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

// {
//     "bull_re": 0.42748091603053434,
//     "bull_ab": 112,
//     "bear_ab": 72,
//     "bear_re": 0.2748091603053435,
//     "sideways_ab": 78,
//     "sideways_re": 0.29770992366412213
// }

export const sidewaysColumns = [
  {
    field: "sideways_ab",
    headerName: "Absolue",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.sideways_ab}</strong>,
  },
  {
    field: "sideways_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (params) => params.row.sideways_re?.toFixed(2) + "%",
  },
];
export const bearColumns = [
  {
    field: "bear_ab",
    headerName: "Absolue",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.bear_ab}</strong>,
  },
  {
    field: "bear_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (params) => params.row.bear_re?.toFixed(2) + "%",
  },
];

export const bullColumns = [
  {
    field: "bull_ab",
    headerName: "Absolue",
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.bull_ab}</strong>,
  },
  {
    field: "bull_re",
    headerName: "Relative",
    flex: 0.3,
    renderCell: (params) => params.row.bull_re?.toFixed(2) + "%",
  },
];

const classementPerfRating = (value) => {
  switch (value) {
    case 4:
      return 1;
    case 3:
      return 2;
    case 2:
      return 3;
    default:
      return 4;
  }
};
const loeilExpertRating = (value) => {
  switch (value) {
    case "Très bon":
      return 5;
    case "Bon":
      return 4;
    case "Mauvais":
      return 3;

    default:
      return 1;
  }
};
const barometreRating = (value) => {
  switch (value) {
    case "Très haussier":
      return 1;
    case "Haussier":
      return 1;
    case "Neutre":
      return 5;
    case "Baissier":
      return 5;
    case "Très baissier":
      return 5;
    default:
      return 1;
  }
};
