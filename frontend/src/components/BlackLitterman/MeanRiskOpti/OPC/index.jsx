import React, { memo } from "react";
import { useSelector } from "react-redux";
import MainLoader from "../../../loaders/MainLoader";
import { Box } from "@mui/material";
import { assetClassesColumns, indicColumns } from "../columns";
import Table from "../../../Table";
import Frontier from "../../../charts/BlackLitterman/MeanRiskOpti/Frontier";
import RiskMeasures from "../../../charts/BlackLitterman/PortfolioAllocation/RiskMeasures";
import FrontierMean from "../../../charts/BlackLitterman/MeanRiskOpti/FrontierMean";
import CovCorrHeatmap from "../../../charts/BlackLitterman/PortfolioAllocation/CovCorrHeatmap";
import {
  Heatmap,
  PtfReturnsHisto,
  PlotEff,
  CovHeatMap,
} from "../../../charts/BlackLitterman/MeanRiskOpti/OPC";

const index = () => {
  const {
    meanRisk: {
      OPCVM: { data, loading },
    },
  } = useSelector((state) => state.blackLitterman);
  console.log("mean risk OPCVm data", loading, data);

  return (
    <div>
      {loading && <MainLoader />}
      {!Array.isArray(data) && (
        <Box>
          {/* {data?.asset_classes.length > 0 && (
            <Table rows={data.assetClasses} columns={assetClassesColumns} />
          )} */}
          {/* {data?.df_weights?.length > 0 && <Frontier data={data?.df_weights} />} */}
          {data?.df_frontier?.length > 0 && (
            <Frontier data={data?.df_frontier} />
          )}
          {data?.df_indic.length > 0 && (
            <Table
              rows={data.df_indic}
              columns={indicColumns}
              pageSize={25}
              sx={{
                "& .MuiDataGrid-cell": {
                  padding: 0,
                },
              }}
            />
          )}
          {data?.w_s?.length > 0 && <RiskMeasures data={data?.w_s} />}
          {/* {data?.w_s?.length > 0 && data?.mu?.length > 0 && (
            <FrontierMean xAxisData={data?.mu[0]} yAxisData={data?.w_s} />
          )} */}
          {data?.cov?.length > 0 && <CovHeatMap data={data?.cov} />}
          {data?.w_s?.length > 0 && <Heatmap data={data?.w_s} />}
          {data?.Portfolio_Returns_Histogram?.length > 0 && (
            <PtfReturnsHisto data={data?.Portfolio_Returns_Histogram} />
          )}
          {data?.Plot_efficient_frontier.length > 0 && (
            <PlotEff data={data?.Plot_efficient_frontier} />
          )}
        </Box>
      )}
    </div>
  );
};

export default memo(index);
