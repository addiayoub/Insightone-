import { makeStyles, styled } from "@mui/styles";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import React from "react";
import NewsModal from "./Secteurs/NewsModal";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

function Table({
  columns,
  rows,
  rowId,
  pagination = true,
  autoHeight = false,
  showOnClick = false,
  pageSize = 5,
  showToolbar = true,
}) {
  const classes = useStyles();
  const slots = showToolbar ? { toolbar: CustomToolbar } : {};
  const [clickedRowId, setClickedRowId] = useState(null);
  const handleClose = () => setClickedRowId(null);
  const [row, setRow] = useState({});
  const handleCellClick = (params) => {
    setClickedRowId(params.id);
    setRow(params.row);
  };

  const getRowClassName = (params) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";
  return (
    <>
      <StripedDataGrid
        className="my-5"
        columns={columns}
        rows={injectId(rows)}
        hideFooter={rows.length < 5}
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: "Aucune donnée à afficher",
          noResultsOverlayLabel: "Aucun résultat trouvé",
          toolbarExportCSV: "Télécharger CSV",
        }}
        getRowClassName={getRowClassName}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Lignes par page:",
          },
        }}
        slots={slots}
        onCellClick={handleCellClick}
        getRowHeight={() => (autoHeight ? "auto" : 0)}
        pageSizeOptions={[5, 10, 25, 50, 100]}
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

export default Table;
