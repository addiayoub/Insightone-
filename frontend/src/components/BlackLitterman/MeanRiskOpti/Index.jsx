import React, { memo } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";
import SharpeMeanVar from "../../charts/BlackLitterman/MeanRiskOpti/SharpeMeanVar";
import Frontier from "../../charts/BlackLitterman/MeanRiskOpti/Frontier";
import RiskMeasures from "../../charts/BlackLitterman/PortfolioAllocation/RiskMeasures";
import Table from "../../Table";
import { assetClassesColumns } from "./columns";
import Views from "./Views";
import FrontierMean from "../../charts/BlackLitterman/MeanRiskOpti/FrontierMean";

const Index = () => {
  const {
    meanRiskOpti: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const show = !loading;
  return (
    <>
      <Filter />
      {/* <Views /> */}
      {loading && <MainLoader />}
      {show && data.assetClasses.length > 0 && (
        <Table rows={data.assetClasses} columns={assetClassesColumns} />
      )}
      {show && data.weights.length > 0 && (
        <SharpeMeanVar data={data.weights} title="Sharpe Mean Variance" />
      )}
      {show && data.weightsBl.length > 0 && (
        <SharpeMeanVar data={data.weightsBl} title="Sharpe Black Litterman" />
      )}
      {show && data.weightsBl.length > 0 && <Frontier data={data.frontier} />}
      {show && data.ws.length > 0 && <RiskMeasures data={data.ws} />}
      {show && data.ws.length > 0 && data.mu.length > 0 && (
        <FrontierMean xAxisData={data.mu[0]} yAxisData={data.ws} />
      )}
    </>
  );
};

export default memo(Index);
