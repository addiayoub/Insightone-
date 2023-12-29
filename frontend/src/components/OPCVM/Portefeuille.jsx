import React, { useCallback } from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import { Box } from "@mui/material";
import PortefeuilleSunburst from "./PortefeuilleSunburst";
import SavePortefeuille from "../SavePortefeuille";
import { useSelector } from "react-redux";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function Portefeuille({ title, data, field, compare }) {
  const rows = compare
    ? data
    : data
        .filter((item) => item[field] >= 0.01)
        .map((item) => ({
          ...item,
          [field]: field === "Poids_MASI" ? item[field] * 100 : item[field],
        }))
        .sort((a, b) => b[field] - a[field]);
  console.log("rows", rows);
  const columns = [
    {
      field: "Societe_Gestion",
      headerName: "Société de Gestion",
      flex: 0.7,
      renderCell: (params) => <strong>{params.row.Societe_Gestion}</strong>,
    },
    {
      field: "Classification",
      headerName: "Classification",
      flex: 0.5,
      renderCell: (params) => <strong>{params.row.Classification}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      flex: 0.7,
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
  ];
  return (
    <Box
      // sx={gridStyle}
      className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mb-10"
    >
      <Table
        columns={columns}
        rows={rows}
        pageSize={25}
        className="md:col-span-8 lg:col-span-8 xl:col-span-8"
      />
      <Box className="md:col-span-4 lg:col-span-4 xl:col-span-4">
        {rows.length > 0 && !compare && (
          <SavePortefeuille
            data={rows}
            title={title}
            type={"OPCVM"}
            field={field}
          />
        )}
        <PortefeuilleSunburst data={rows} field={field} />
      </Box>
      {/* <PortefeuilleDonut data={rows} field={field} /> */}
    </Box>
  );
}

export default Portefeuille;
