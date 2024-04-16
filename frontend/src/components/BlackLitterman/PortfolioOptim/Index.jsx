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
            <Table
              columns={weightsColumns}
              rows={data.weights}
              className="h-fit"
              legend="PORTFOLIO WEIGHTS:"
            />
          </GridItem>
        )}
        {show && data.metrics.length > 0 && (
          <GridItem>
            <Table
              columns={metricsColumns}
              rows={data.metrics}
              className="h-fit"
              legend="PORTFOLIO METRICS:"
            />
          </GridItem>
        )}
      </GridContainer>
      {show && data.simulations.length > 0 && (
        <>
          <Table
            columns={simulationsColumns}
            rows={data.simulations}
            legend="SIMULATIONS RESULT:"
          />
        </>
      )}
      <GridContainer extraCss="my-5">
        {show && data.optimizedSharpe.length > 0 && (
          <GridItem>
            <Table
              columns={optimizedColumns}
              rows={data.optimizedSharpe}
              legend="OPTIMIZED SHARPE:"
              className="h-fit"
            />
          </GridItem>
        )}
        {show && data.optimizedVolatility.length > 0 && (
          <GridItem>
            <Table
              columns={optimizedColumns}
              rows={data.optimizedVolatility}
              className="h-fit"
              legend="OPTIMIZED VOLATILITY:"
            />
          </GridItem>
        )}
      </GridContainer>
    </>
  );
};

export default memo(Index);
