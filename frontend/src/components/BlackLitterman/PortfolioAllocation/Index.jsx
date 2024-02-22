import React, { memo, useState } from "react";
import Filter from "./Filter";
import CovCorrHeatmap from "../../charts/BlackLitterman/PortfolioAllocation/CovCorrHeatmap";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";
import MarketPrior from "../../charts/BlackLitterman/PortfolioAllocation/MarketPrior";
import { Box } from "@mui/material";
import Rets from "../../charts/BlackLitterman/PortfolioAllocation/Rets";
import Weights from "../../charts/BlackLitterman/PortfolioAllocation/Weights";
import Upload from "../../Backtest/UploadPtf/Upload";

const Index = () => {
  const {
    portfolioAllocation: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const [isShow, setIsShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const show = !loading && showFilter && isShow;
  return (
    <>
      <Upload show={showFilter} setShow={setShowFilter} />
      {showFilter && <Filter {...{ setIsShow }} />}
      {loading && <MainLoader />}
      <Box className="flex flex-col gap-2">
        {show && data.covariantCorrelation.length > 0 && (
          <CovCorrHeatmap
            data={data.covariantCorrelation}
            title="Covariant Correlation"
          />
        )}
        {show && data.bl.length > 0 && (
          <CovCorrHeatmap data={data.bl} title="BL" />
        )}
        {show && data.omega.length > 0 && (
          <CovCorrHeatmap data={data.omega} title="Omega" />
        )}
        {show && data.marketPrior.length > 0 && (
          <MarketPrior data={data.marketPrior} />
        )}
        {show && data.rets.length > 0 && <Rets data={data.rets} />}
        {show && data.weights.length > 0 && (
          <Box className="">
            <Weights data={data.weights} />
            <MarketPrior data={data.weights} field="Weight" title="Weights" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default memo(Index);
