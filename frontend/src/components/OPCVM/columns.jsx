import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { ArrowDown, ArrowRight, ArrowUp } from "react-feather";
import RenderStarsWithRating from "../Markowitz/RenderStarsWithRating";
import { Typography } from "@mui/material";

const textColor = (value) => {
  value = +value;
  let className = "";
  let arrow = <ArrowRight size={18} />;
  if (value > 0) {
    className = "text-success";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-error";
    arrow = <ArrowDown size={18} />;
  }
  return (
    <span className={`${className} font-semibold`}>
      <span>{formatNumberWithSpaces(value)}%</span>
      <span>{arrow}</span>
    </span>
  );
};
export const columns = [
  {
    field: "Societe_Gestion",
    headerName: "Société de gestion",
    flex: 0.6,
    width: 360,
    renderCell: (params) => <strong>{params.row.Societe_Gestion}</strong>,
  },
  {
    field: "Classification",
    headerName: "Classification",
    flex: 0.3,
    width: 360,
    renderCell: (params) => <strong>{params.row.Classification}</strong>,
  },
  {
    field: "DENOMINATION_OPCVM",
    headerName: "LIBELLE",
    flex: 0.6,
    width: 360,
    renderCell: (params) => <strong>{params.row.DENOMINATION_OPCVM}</strong>,
  },
  {
    field: "Performance",
    headerName: "Performance",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) =>
      textColor((params.row.Performance * 100).toFixed(2)),
  },
  {
    field: "Performance_AN",
    headerName: "Performance Anualisé",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) =>
      textColor((params.row.Performance_AN * 100).toFixed(2)),
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    headerAlign: "center",
    align: "center",
    flex: 0.3,
    width: 360,
    renderCell: (params) => textColor((params.row.Volatilite * 100).toFixed(2)),
  },
  {
    field: "EM_Hebdo",
    headerName: "Encours (MMAD)",
    headerAlign: "center",
    align: "center",
    flex: 0.7,
    width: 360,
    renderCell: (params) => {
      const value = params.row.EM_Hebdo / 1e6;
      return (
        <div className="flex">
          <Typography
            variant="body2"
            className="mr-3 font-semibold min-w-[90px] text-right"
          >
            {formatNumberWithSpaces(value.toFixed(2))}
          </Typography>
          <RenderStarsWithRating value={value} getStarRating={getStarRating} />
        </div>
      );
    },
  },
  {
    field: "Nb_Semaine",
    headerName: "Nombre de semaines",
    headerAlign: "center",
    align: "center",
    flex: 0.2,
    width: 360,
    renderCell: (params) => params.row.Nb_Semaine,
  },
];

const getStarRating = (value) => {
  if (value >= 0 && value < 1) {
    return 0;
  } else if (value >= 1 && value < 50) {
    return 1;
  } else if (value >= 50 && value < 200) {
    return 2;
  } else if (value >= 200 && value < 600) {
    return 3;
  } else if (value >= 600 && value < 1000) {
    return 4;
  } else {
    return 5;
  }
};
