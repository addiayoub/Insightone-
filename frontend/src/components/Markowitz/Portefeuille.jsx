import React, { memo } from "react";
import PortefeuilleSunburst from "../charts/PortefeuilleSunburst";
import SavePortefeuille from "../SavePortefeuille";
import PortefeuilleTable from "./PortefeuilleTable";
import GridContainer, { GridItem } from "../Ui/GridContainer";
const gridStyle = {
  display: "grid",
  // gridTemplateColumns: "repeat(2, minmax(500px, 1fr))",
  gridTemplateColumns: "repeat(2, 7fr 5fr)",
  gap: "60px 15px",
};

function Portefeuille({ title, data, field, compare, saveAll = false }) {
  console.log("rows before", field, data);

  const rows = compare
    ? data
    : data
        .filter((item) => item[field] >= 0.00000001)
        .map((item) => ({
          ...item,
          [field]: field === "Poids_MASI" ? item[field] * 100 : item[field],
        }))
        .sort((a, b) => b[field] - a[field]);
  console.log("rows after", field, rows);
  console.log(
    "data",
    field,
    data.filter((item) => item[field] < 0.01)
  );
  return (
    <GridContainer
      // sx={gridStyle}
      xGap={12}
      extraCss="mb-10"
    >
      <GridItem cols={8}>
        {/* <Table columns={columns} rows={rows} pageSize={25} /> */}
        <PortefeuilleTable rows={rows} field={field} />
      </GridItem>
      <GridItem cols={4}>
        {rows.length > 0 && !compare && (
          <SavePortefeuille
            title={title}
            data={rows}
            type="Actions"
            field={field}
            saveAll={saveAll}
          />
        )}
        <PortefeuilleSunburst data={rows} field={field} />
      </GridItem>
    </GridContainer>
  );
}

export default memo(Portefeuille);
