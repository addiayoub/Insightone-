import React from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { Box } from "@mui/material";

function RendementRisqueData({ data }) {
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
        const val = params.row.Performance * 100;

        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(val.toFixed(2))} %
          </span>
        );
      },
    },
    {
      field: "Volatilite",
      headerName: "Volatilité",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row.Volatilite * 100;

        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(val.toFixed(2))} %
          </span>
        );
      },
    },
  ];
  return (
    <Box>
      <Table columns={columns} rows={data} />
    </Box>
  );
}

export default RendementRisqueData;
