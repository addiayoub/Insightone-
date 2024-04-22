import React from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import { Box } from "@mui/material";
import AccordionBox from "../Ui/AccordionBox";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function PoidsMasi({ data }) {
  const rows = data
    .filter((item) => item.Poids_MASI >= 0.01)
    .sort((a, b) => b.Poids_MASI - a.Poids_MASI);
  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: "Poids_MASI",
      headerName: "Poids (%)",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row?.Poids_MASI?.toFixed(2);
        return (
          <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
        );
      },
    },
  ];
  return (
    <AccordionBox title={"poids MASI"} isExpanded={true}>
      <Box sx={gridStyle} className="mb-10">
        <Table columns={columns} rows={rows} pageSize={25} />
        <PortefeuilleDonut data={rows} field="Poids_MASI" />
      </Box>
    </AccordionBox>
  );
}

export default PoidsMasi;
