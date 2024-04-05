import React, { memo, useEffect } from "react";
import PortefeuilleSunburst from "../charts/PortefeuilleSunburst";
import SavePortefeuille from "../SavePortefeuille";
import PortefeuilleTable from "./PortefeuilleTable";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { useDispatch } from "react-redux";
import { setPtfName } from "../../redux/slices/PtfSlice";

function Portefeuille({
  title,
  data,
  field,
  compare,
  saveAll = false,
  dataToSave = [],
}) {
  console.log("rows before", field, data);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(setPtfName(""));
  }, []);
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
            dataToSave={dataToSave}
          />
        )}
        <PortefeuilleSunburst data={rows} field={field} />
      </GridItem>
    </GridContainer>
  );
}

export default memo(Portefeuille);
