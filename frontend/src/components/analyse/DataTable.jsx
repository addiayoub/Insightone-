import React from "react";
import Table from "../Table";
import { Typography, Box } from "@mui/material";

function DataTable({ title, columns, rows, resume, id }) {
  return (
    <>
      <Typography variant="h4" className="font-semibold my-5" id={id}>
        {title}
      </Typography>
      {resume && (
        <Box className="m-3 flex items-center gap-x-5 mobileOnly:flex-col mobileOnly:items-start mobileOnly:gap-y-3 flex-wrap">
          <Box component={"div"}>
            <Box component={"span"} className="text-muted">
              Résumé:
            </Box>
          </Box>
          <Box component={"div"} className="flex items-center gap-x-3">
            <Box component={"div"}>
              <Box component={"span"}>
                <Box component={"span"} className="text-muted mr-1">
                  Achat:
                </Box>
                <Box component={"span"} className="font-semibold">
                  {resume.Achat}
                </Box>
              </Box>
            </Box>
            <Box component={"div"}>
              <Box component={"span"} className="text-muted  mr-1">
                Vente:
              </Box>
              <Box component={"span"} className="font-semibold">
                {resume.Vente}
              </Box>
            </Box>
            <Box component={"div"}>
              <Box component={"span"} className="text-muted mr-1">
                Neutre:
              </Box>
              <Box component={"span"} className="font-semibold">
                {resume.Neutre}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
}

export default DataTable;
