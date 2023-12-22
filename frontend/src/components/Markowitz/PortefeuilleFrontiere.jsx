import React from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import { Box } from "@mui/material";
import AccordionBox from "../AccordionBox";
import PortefeuilleSunburst from "../charts/PortefeuilleSunburst";
import PtfRange from "../charts/PtfRange";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function PortefeuilleFrontiere({ data, field, ptfs }) {
  const rows = data
    .filter((item) => item[field] >= 0.01)
    .map((item) => ({
      ...item,
      [field]: item[field] * 100,
    }))
    .sort((a, b) => b[field] - a[field]);
  console.log("rows", rows);
  const columns = [
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
  ];
  return (
    <AccordionBox title={field} isExpanded={true}>
      <PtfRange ptfs={ptfs} selected={field} />
      <Box sx={gridStyle} className="mb-10">
        <Table columns={columns} rows={rows} pageSize={25} showToolbar={true} />
        <PortefeuilleDonut data={rows} field={field} />
      </Box>
    </AccordionBox>
  );
}

export default PortefeuilleFrontiere;
