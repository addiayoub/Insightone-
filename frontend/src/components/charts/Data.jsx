import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Setting2 } from "iconsax-react";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/actions/DataActions";
import { logout } from "../../redux/slices/AuthSlice";
import { openModal } from "../../redux/slices/DataSlice";
import { notyf } from "../../utils/notyf";
import resetStates from "../../utils/resetStates";
import Loader from "../loader/Loader";
import Chart from "./Chart";
import SettingsModal from "./SettingsModal";
function Data() {
  const { data, loading, hideChart, modalIsOpen } = useSelector(
    (state) => state.rapport
  );
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData())
      .unwrap()
      .then(({ data }) => {
        const transformedData = data.reduce((result, item) => {
          for (const key in item) {
            if (!result[key]) {
              result[key] = [];
            }
            result[key].push(item[key]);
          }
          return result;
        }, {});

        const result = {
          seance: transformedData.seance.reverse().map((dateString) => {
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
            return formattedDate;
          }),
          masi: transformedData.masi.reverse(),
          volume: transformedData.volume.reverse(),
          variation: transformedData.variation.reverse(),
        };
        console.log("chart data", result);
        setChartData(result);
      })
      .catch((rejectedValue) => {
        console.log("DATA rejectedValue", rejectedValue);
        if (rejectedValue.status) {
          dispatch(logout());
        }
        // notyf.error(rejectedValue);
      });
  }, [dispatch]);
  const columns = [
    {
      field: "seance",
      headerName: "Séance",
      width: 360,
      renderCell: (params) => moment(params.row.seance).format("DD/MM/YYYY"),
    },
    {
      field: "masi",
      headerName: "MASI",
      width: 360,
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 360,
    },
    {
      field: "variation",
      headerName: "Variation",
      width: 360,
    },
  ];

  if (!hideChart) {
    return <Chart data={chartData} />;
  }

  return (
    <Box sx={{ width: "100%", minHeight: "400px", position: "relative" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      ></Typography>
      {!loading && (
        <Button
          variant="contained"
          sx={{ marginBlock: 1, fontSize: "16px" }}
          onClick={() => dispatch(openModal())}
        >
          <Setting2 size="27" style={{ marginRight: "5px" }} />
          Paramètres Graphique
        </Button>
      )}
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          sx={{ minHeight: "400px", width: "100%" }}
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: "Aucune donnée à afficher",
            noResultsOverlayLabel: "Aucun résultat trouvé",
          }}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Lignes par page:",
            },
          }}
          pageSizeOptions={[5, 25, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      )}
      {modalIsOpen && <SettingsModal />}
    </Box>
  );
}

export default Data;
