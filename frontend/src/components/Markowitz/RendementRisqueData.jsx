import React, { memo } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { Box } from "@mui/material";
import TextColor from "../Dashboard/TextColor";
const columns = [
  {
    field: "NOM_INDICE",
    headerName: "INDICE",
    flex: 1,
    renderCell: (params) => {
      return <span className="font-bold">{params.row.NOM_INDICE}</span>;
    },
  },
  {
    field: "Performance",
    headerName: "Performance",
    flex: 0.5,
    renderCell: (params) => {
      const val = params.row.Performance;
      return <TextColor value={val} percentage />;
      // return (
      //   <span className="max-w-[90px] min-w-[60px] text-right">
      //     {formatNumberWithSpaces(val.toFixed(2))} %
      //   </span>
      // );
    },
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    flex: 0.5,
    renderCell: (params) => {
      const val = params.row.Volatilite;
      return <TextColor value={val} percentage />;
      // return (
      //   <span className="max-w-[90px] min-w-[60px] text-right">
      //     {formatNumberWithSpaces(val.toFixed(2))} %
      //   </span>
      // );
    },
  },
];
function RendementRisqueData({ data }) {
  return (
    <Box>
      <Table columns={columns} rows={data} />
    </Box>
  );
}

export default memo(RendementRisqueData);
