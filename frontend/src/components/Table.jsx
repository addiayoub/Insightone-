import { makeStyles, styled } from "@mui/styles";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import React, { memo, useCallback } from "react";
import NewsModal from "./Secteurs/NewsModal";
import { useState } from "react";
import injectId from "../utils/injectId";
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
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}
const getRowClassName = (params) =>
  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";

const localeText = {
  noRowsLabel: "Aucune donnée à afficher",
  noResultsOverlayLabel: "Aucun résultat trouvé",
  toolbarExportCSV: "Télécharger CSV",
  selectedRowsLabel: "Custom Selected Rows",
};
const paginationOptions = [5, 10, 25, 50, 100];
function Table({
  columns,
  rows,
  rowId,
  pagination = true,
  autoHeight = false,
  showOnClick = false,
  pageSize = 5,
  showToolbar = true,
  showFooter,
  className = "",
  withCheckboxes,
  shouldHandleCellClick,
  setSelectedRows,
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

  return (
    <>
      <StripedDataGrid
        className={`${className} my-5`}
        columns={columns}
        rows={rows}
        hideFooter={rows.length < 5 && !showFooter}
        disableRowSelectionOnClick
        localeText={localeText}
        getRowId={(row) => row.id}
        getRowClassName={getRowClassName}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Lignes par page:",
          },
        }}
        slots={slots}
        checkboxSelection={withCheckboxes}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
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
    </>
  );
}

export default memo(Table);
