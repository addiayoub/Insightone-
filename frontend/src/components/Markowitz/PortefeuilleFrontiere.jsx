import React, { memo } from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import AccordionBox from "../AccordionBox";
import PtfRange from "../charts/PtfRange";
import Portefeuille from "../OPCVM/Portefeuille";
import PortefeuilleMarko from "../Markowitz/Portefeuille";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: "60px 15px",
};

function PortefeuilleFrontiere({ data, field, ptfs, type, setField }) {
  console.log("PortefeuilleFrontiere data", data);
  const rows = data
    .filter((item) => item[field] >= 0.01)
    // .map((item) => ({
    //   ...item,
    //   [field]: item[field] * 100,
    // }))
    .sort((a, b) => b[field] - a[field]);
  console.log("rows PortefeuilleFrontiere", rows);
  console.log("Type...", type);
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
      <PtfRange ptfs={ptfs} selected={field} setSelected={setField} />
      {type === "OPCVM" ? (
        <Portefeuille data={rows} field={field} saveAll={true} />
      ) : (
        <PortefeuilleMarko data={rows} field={field} saveAll={true} />
      )}
      {/* <Box
        // sx={gridStyle}
        className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mb-10"
      >
        <Table
          columns={columns}
          rows={rows}
          pageSize={25}
          showToolbar={true}
          className="md:col-span-8 lg:col-span-8 xl:col-span-8"
        />
        <Box className="md:col-span-4 lg:col-span-4 xl:col-span-4">
          {rows.length > 0 && (
            <SavePortefeuille data={rows} type={type} title={field} />
          )}
          <PortefeuilleDonut data={rows} field={field} />
        </Box>
      </Box> */}
    </AccordionBox>
  );
}

export default memo(PortefeuilleFrontiere);
