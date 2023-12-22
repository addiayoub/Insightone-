import React from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import { Box } from "@mui/material";
import AccordionBox from "../AccordionBox";
import PortefeuilleSunburst from "../charts/PortefeuilleSunburst";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function Portefeuille({ title, data, field }) {
  const rows = data
    .filter((item) => item[field] >= 0.01)
    .map((item) => ({
      ...item,
      [field]: field === "Poids_MASI" ? item[field] * 100 : item[field],
    }))
    .sort((a, b) => b[field] - a[field]);
  console.log("rows", rows);
  const secteurSums = rows.reduce((acc, row) => {
    const secteur = row.SECTEUR_ACTIVITE;
    acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
    return acc;
  }, {});
  const columns = [
    {
      field: "SECTEUR_ACTIVITE",
      headerName: "SECTEUR ACTIVITÉ",
      flex: 1,
      renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      flex: 0.5,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: field,
      headerName: "Poids (%)",
      flex: 0.3,
      renderCell: (params) => {
        const val = params.row?.[field]?.toFixed(2);
        return (
          <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
        );
      },
    },
    {
      field: "Somme_Secteur",
      headerName: "Somme",
      flex: 0.3,
      renderCell: (params) => {
        const secteur = params.row.SECTEUR_ACTIVITE;
        const sum = secteurSums[secteur] || 0;
        return (
          <span className="font-semibold">
            {formatNumberWithSpaces(sum.toFixed(2))}
          </span>
        );
      },
    },
  ];
  return (
    <Box sx={gridStyle} className="mb-10">
      <Table columns={columns} rows={rows} pageSize={25} />
      <PortefeuilleSunburst data={rows} field={field} />
      {/* <PortefeuilleDonut data={rows} field={field} /> */}
    </Box>
  );
}

export default Portefeuille;