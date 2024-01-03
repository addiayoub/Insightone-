import React from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import PortefeuilleDonut from "../charts/PortefeuilleDonut";
import { Box } from "@mui/material";
import PortefeuilleSunburst from "../charts/PortefeuilleSunburst";
import SavePortefeuille from "../SavePortefeuille";
import { useSelector } from "react-redux";
import PortefeuilleTable from "./PortefeuilleTable";
const gridStyle = {
  display: "grid",
  // gridTemplateColumns: "repeat(2, minmax(500px, 1fr))",
  gridTemplateColumns: "repeat(2, 7fr 5fr)",
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
  return (
    <Box
      // sx={gridStyle}
      className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mb-10"
    >
      <Box className="md:col-span-8 lg:col-span-8 xl:col-span-8">
        {/* <Table columns={columns} rows={rows} pageSize={25} /> */}
        <PortefeuilleTable rows={rows} field={field} />
      </Box>
      <Box className="md:col-span-4 lg:col-span-4 xl:col-span-4">
        {rows.length > 0 && !compare && (
          <SavePortefeuille
            title={title}
            data={rows}
            type="Actions"
            field={field}
          />
        )}
        <PortefeuilleSunburst data={rows} field={field} />
      </Box>
    </Box>
  );
}

export default Portefeuille;
