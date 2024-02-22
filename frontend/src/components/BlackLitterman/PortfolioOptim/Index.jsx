import React, { memo } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import Table from "../../Table";
import {
  metricsColumns,
  optimizedColumns,
  simulationsColumns,
  weightsColumns,
} from "./columns";
import MainLoader from "../../loaders/MainLoader";
import ReturnsRiskScatter from "../../charts/BlackLitterman/PortfolioOpti/ReturnsRiskScatter";
import GridContainer, { GridItem } from "../../Ui/GridContainer";

const Index = () => {
  const {
    portfolioOpti: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const show = !loading;
  return (
    <>
      <Filter />
      {loading && <MainLoader />}
      {show && data.simulations.length > 0 && (
        <>
          <ReturnsRiskScatter
            data={data.simulations}
            maxSharpe={data.maxSharpeRatio}
            minVola={data.minVolatility}
          />
        </>
      )}
      <GridContainer extraCss="my-8">
        {show && data.weights.length > 0 && (
          <GridItem>
            <h3>PORTFOLIO WEIGHTS:</h3>
            <Table
              columns={weightsColumns}
              rows={data.weights}
              className="h-fit"
            />
          </GridItem>
        )}
        {show && data.metrics.length > 0 && (
          <GridItem>
            <h3>PORTFOLIO METRICS:</h3>
            <Table
              columns={metricsColumns}
              rows={data.metrics}
              className="h-fit"
            />
          </GridItem>
        )}
      </GridContainer>
      {show && data.simulations.length > 0 && (
        <>
          <h3>SIMULATIONS RESULT:</h3>
          <Table columns={simulationsColumns} rows={data.simulations} />
        </>
      )}
      <GridContainer extraCss="my-5">
        {show && data.optimizedSharpe.length > 0 && (
          <GridItem>
            <h3>OPTIMIZED SHARPE:</h3>
            <Table
              columns={optimizedColumns}
              rows={data.optimizedSharpe}
              className="h-fit"
            />
          </GridItem>
        )}
        {show && data.optimizedVolatility.length > 0 && (
          <GridItem>
            <h3>OPTIMIZED VOLATILITY:</h3>
            <Table
              columns={optimizedColumns}
              rows={data.optimizedVolatility}
              className="h-fit"
            />
          </GridItem>
        )}
      </GridContainer>
    </>
  );
};

export default memo(Index);
