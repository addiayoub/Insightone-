import React from "react";
import AccordionBox from "../AccordionBox";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { ArrowDown, ArrowRight, ArrowUp } from "react-feather";
import { renderStarsWithRating } from "../../utils/renderStarsWithRating";
import { calculatePercentage } from "../../utils/calculatePercentage";

const textColor = (value) => {
  value = +value;
  let className = "";
  let arrow = <ArrowRight size={18} />;
  if (value > 0) {
    className = "text-[var(--text-success)]";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-[var(--text-warning)]";
    arrow = <ArrowDown size={18} />;
  }
  return (
    <span className={`${className} font-semibold`}>
      <span>{formatNumberWithSpaces(value)}%</span>
      <span>{arrow}</span>
    </span>
  );
};

function Data({ data }) {
  const columns = [
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
      flex: 0.7,
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
      flex: 0.25,
      width: 360,
      renderCell: (params) =>
        textColor((params.row.Volatilite * 100).toFixed(2)),
    },
    {
      field: "EM_Hebdo",
      headerName: "Encours (MMAD)",
      headerAlign: "center",
      align: "center",
      flex: 0.7,
      width: 360,
      renderCell: (params) => {
        return renderStarsWithRating(params.row.EM_Hebdo / 1e6);
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
  return (
    <AccordionBox title={"Data"} isExpanded={true}>
      <h3 className="text-right">{`${data.filteredData.length}/${
        data.data.length
      } (${calculatePercentage(
        data.filteredData.length,
        data.data.length
      )}%)`}</h3>
      <Table columns={columns} rows={data.filteredData} pageSize={10} />
    </AccordionBox>
  );
}

export default Data;
