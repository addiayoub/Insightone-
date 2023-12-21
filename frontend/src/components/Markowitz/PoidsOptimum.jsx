import React from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import { Box } from "@mui/material";
import AccordionBox from "../AccordionBox";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function PoidsOptimum({ data }) {
  const rows = data
    .filter((item) => item.PTF_Min_Var >= 0.01)
    .sort((a, b) => b.PTF_Min_Var - a.PTF_Min_Var);
  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: "PTF_Min_Var",
      headerName: "Poids (%)",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row?.PTF_Min_Var?.toFixed(2);
        return (
          <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
        );
      },
    },
  ];
  return (
    <AccordionBox title={"Portefeuille minimum variance"} isExpanded={true}>
      <Box sx={gridStyle} className="mb-10">
        <Table columns={columns} rows={rows} pageSize={25} />
        <PortefeuilleDonut data={rows} field="PTF_Min_Var" />
      </Box>
    </AccordionBox>
  );
}

export default PoidsOptimum;
