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

function PortefeuilleMaximale({ data }) {
  const rows = data
    .filter((item) => item.PTF_Max_Rdt >= 0.01)
    .sort((a, b) => b.PTF_Max_Rdt - a.PTF_Max_Rdt);
  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: "PTF_Max_Rdt",
      headerName: "Poids (%)",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row?.PTF_Max_Rdt?.toFixed(2);
        return (
          <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
        );
      },
    },
  ];
  return (
    <AccordionBox title={"Portefeuille Rendement Maximale"} isExpanded={true}>
      <Box sx={gridStyle} className="mb-10">
        <Table columns={columns} rows={rows} pageSize={25} />
        <PortefeuilleDonut data={rows} field={"PTF_Max_Rdt"} />
      </Box>
    </AccordionBox>
  );
}

export default PortefeuilleMaximale;
