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

function PoidsEquip({ data }) {
  const rows = data
    .filter((item) => item.PTF_equi_pond >= 0.01)
    .sort((a, b) => b.PTF_equi_pond - a.PTF_equi_pond);
  const columns = [
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      renderCell: (params) => <strong>{params.row.titre}</strong>,
    },
    {
      field: "PTF_equi_pond",
      headerName: "Poids (%)",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row?.PTF_equi_pond?.toFixed(2);
        return (
          <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
        );
      },
    },
  ];
  return (
    <AccordionBox title={"Les poids equipondéré"} isExpanded={true}>
      <Box sx={gridStyle} className="mb-10">
        <Table columns={columns} rows={rows} pageSize={25} />
        <PortefeuilleDonut data={rows} field="PTF_equi_pond" />
      </Box>
    </AccordionBox>
  );
}

export default PoidsEquip;
