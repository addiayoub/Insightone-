import React, { useCallback } from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import Table from "../Table";
import { Box } from "@mui/material";
import PortefeuilleSunburst from "./PortefeuilleSunburst";
import SavePortefeuille from "../SavePortefeuille";
import { useSelector } from "react-redux";
import PortefeuilleTable from "./PortefeuilleTable";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function Portefeuille({
  title,
  data,
  field,
  compare,
  saveAll = false,
  dataToSave,
}) {
  const rows = data
    .filter((item) => item[field] >= 0.01)
    .map((item) => ({
      ...item,
      [field]: field === "Poids_MASI" ? item[field] * 100 : item[field],
    }))
    .sort((a, b) => b[field] - a[field]);
  console.log("Portefeuille front 2 rows", rows, data, field, compare);
  return (
    <Box
      // sx={gridStyle}
      className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mb-10"
    >
      <Box className="md:col-span-8 lg:col-span-8 xl:col-span-8 h-fit">
        {/* <Table columns={columns} rows={rows} pageSize={25} /> */}
        <PortefeuilleTable {...{ rows, field }} />
      </Box>
      <Box className="md:col-span-4 lg:col-span-4 xl:col-span-4">
        {rows.length > 0 && (
          <SavePortefeuille
            data={rows}
            title={title}
            type={"OPCVM"}
            field={field}
            saveAll={saveAll}
            dataToSave={dataToSave}
          />
        )}
        <PortefeuilleSunburst data={rows} field={field} />
      </Box>
      {/* <PortefeuilleDonut data={rows} field={field} /> */}
    </Box>
  );
}

export default Portefeuille;
