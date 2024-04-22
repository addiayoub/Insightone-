import { makeStyles, styled } from "@mui/styles";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import React, { memo, useCallback } from "react";
import NewsModal from "./AnalyseSectorial/NewsModal";
import { useState } from "react";
import injectId from "../utils/injectId";
import { dataGridLocale } from "../utils/dataGridLocale";
import { Box } from "@mui/material";
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor:
      theme.palette.mode === "light" ? theme.palette.hover.main : "#2b3134",
  },
}));
const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiDataGrid-overlayWrapper": {
      minHeight: "400px",
    },
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer className="pt-3 pb-4 px-3">
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <GridToolbarQuickFilter className="ml-auto" />
    </GridToolbarContainer>
  );
}
const getRowClassName = (params) =>
  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";
const paginationOptions = [5, 10, 25, 50, 100];
const defaultSx = {
  boxShadow: 2,
  border: 2,
  borderColor: "primary.light",
};
const cellWithoutP = {
  "& .MuiDataGrid-cell": {
    padding: 0,
  },
};
function Table({
  columns,
  rows,
  rowId,
  autoHeight = false,
  showOnClick = false,
  pageSize = 5,
  showToolbar = true,
  showFooter,
  className = "",
  withCheckboxes,
  shouldHandleCellClick,
  setSelectedRows,
  density = "standard",
  withoutCellP,
  sx,
  legend,
}) {
  const classes = useStyles();
  rows = injectId(rows);
  const slots = showToolbar ? { toolbar: CustomToolbar } : {};
  const [clickedRowId, setClickedRowId] = useState(null);
  const handleClose = () => setClickedRowId(null);
  const [row, setRow] = useState({});
  const handleCellClick = useCallback((params) => {
    setClickedRowId(params.id);
    setRow(params.row);
  }, []);
  const mergedSx = withoutCellP ? { ...defaultSx, ...cellWithoutP } : defaultSx;
  console.log("withoutCellP", mergedSx, withoutCellP);
  return (
    <Box>
      {legend && <h3>{legend}</h3>}
      <StripedDataGrid
        className={` my-5 default-table w-full ${className}`}
        columns={columns}
        rows={rows}
        hideFooter={rows.length < 5 && !showFooter}
        disableRowSelectionOnClick
        localeText={dataGridLocale}
        getRowId={(row) => row.id}
        getRowClassName={getRowClassName}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Lignes par page:",
          },
        }}
        sx={{
          ...mergedSx,
          ...sx,
        }}
        density={density}
        slots={slots}
        checkboxSelection={withCheckboxes}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
          console.log("selectedIDs", selectedIDs, "rows", rows);
          setSelectedRows(selectedRows);
        }}
        onCellClick={shouldHandleCellClick ? handleCellClick : null}
        getRowHeight={() => (autoHeight ? "auto" : 0)}
        pageSizeOptions={paginationOptions}
        initialState={{
          pagination: { paginationModel: { pageSize } },
        }}
      />
      {showOnClick && (
        <NewsModal
          row={row}
          clickedRowId={clickedRowId}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
}

export default memo(Table);
