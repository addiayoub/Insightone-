import React, { memo } from "react";
import {
  generateKeyPerfColumns,
  worstDrawdownsColumns,
} from "./portefeuilles/Tables/columns";
import { useSelector } from "react-redux";
import Table from "./Table";
import Cumualative from "./charts/Backtest/Cumualative";
import Rolling from "./charts/Backtest/Rolling";
import DailyReturns from "./charts/Backtest/DailyReturns";
import DistrubitionMonthly from "./charts/Backtest/DistrubitionMonthly";
import EoyChart from "./charts/Backtest/EoyChart";
import WorstDrawDowns from "./charts/Backtest/WorstDrawDowns";
import Underwater from "./charts/Backtest/Underwater";
import MonthlyReturns from "./charts/Backtest/MonthlyReturns";
import Quantiles from "./charts/Backtest/Quantiles";
import GridContainer, { GridItem } from "./Ui/GridContainer";

const DfRendement = ({ forSIM }) => {
  const { backtestData: backData } = useSelector((state) => state.backtest);
  const headers =
    backData.data.keyPerf.length > 0
      ? Object.keys(backData.data.keyPerf[0]).filter((ele) => ele !== "Metric")
      : [];
  console.log("headers is", headers);
  const keyPerfColumns = generateKeyPerfColumns(headers);
  return (
    <>
      <GridContainer extraCss={"gap-x-12 mt-14"} xGap={12}>
        <GridItem cols={7}>
          {!backData.loading && backData.data.cumulative.length > 0 && (
            <>
              <Cumualative data={backData.data.cumulative} forSIM={forSIM} />
            </>
          )}
          {!backData.loading && backData.data.eoy.length > 0 && (
            <>
              <EoyChart data={backData.data.eoy} forSIM={forSIM} />
            </>
          )}
          {!backData.loading &&
            backData.data.distributionMonthly.length > 0 && (
              <>
                <DistrubitionMonthly data={backData.data.distributionMonthly} />
              </>
            )}
          {!backData.loading && backData.data.dailyReturns.length > 0 && (
            <>
              <DailyReturns data={backData.data.dailyReturns} />
            </>
          )}
          {!backData.loading && backData.data.rollingBeta.length > 0 && (
            <>
              <Rolling
                data={backData.data.rollingBeta}
                title="Rolling Beta to Benchmark"
                allSeries
                forSIM={forSIM}
              />
            </>
          )}
          {!backData.loading && backData.data.rollingVolat.length > 0 && (
            <>
              <Rolling
                data={backData.data.rollingVolat}
                title="Rolling Volatility (6-Months)"
                forSIM={forSIM}
              />
            </>
          )}
          {!backData.loading && backData.data.rollingSharpe.length > 0 && (
            <>
              <Rolling
                data={backData.data.rollingSharpe}
                title="Rolling Sharp (6-Months)"
                forSIM={forSIM}
              />
            </>
          )}
          {!backData.loading && backData.data.rollingSortino.length > 0 && (
            <>
              <Rolling
                data={backData.data.rollingSortino}
                title="Rolling Sortino (6-Months)"
              />
            </>
          )}
          {!backData.loading && backData.data.quantiles.length > 0 && (
            <>
              <Quantiles data={backData.data.quantiles} />
            </>
          )}
        </GridItem>
        <GridItem cols={5}>
          {!backData.loading && backData.data.keyPerf.length > 0 && (
            <>
              <h3>Key Performance Metrics</h3>
              <Table
                columns={keyPerfColumns}
                rows={backData.data.keyPerf}
                pageSize={100}
                className="h-max"
              />
            </>
          )}
          {!backData.loading && backData.data.worstDrawdowns.length > 0 && (
            <>
              <h3>Worst 10 Drawdowns</h3>
              <Table
                columns={worstDrawdownsColumns}
                rows={backData.data.worstDrawdowns}
                pageSize={10}
                className="h-max"
              />
            </>
          )}
        </GridItem>
      </GridContainer>
      <GridContainer extraCss="gap-4 my-4">
        <GridItem>
          {!backData.loading && backData.data.worstDrawdowns.length > 0 && (
            <>
              <WorstDrawDowns
                data={backData.data.worstDrawdowns}
                evolution={backData.data.cumulative}
              />
            </>
          )}
        </GridItem>
        <GridItem>
          {!backData.loading && backData.data.underwater.length > 0 && (
            <>
              <Underwater data={backData.data.underwater} />
            </>
          )}
        </GridItem>
      </GridContainer>
      <GridContainer extraCss="gap-4">
        <GridItem>
          {!backData.loading && backData.data.monthlyReturns.length > 0 && (
            <>
              <MonthlyReturns
                data={backData.data.monthlyReturns}
                title="Monthly Returns (%)"
              />
            </>
          )}
        </GridItem>
        <GridItem>
          {!backData.loading && backData.data.monthlyRelReturns.length > 0 && (
            <>
              <MonthlyReturns
                data={backData.data.monthlyRelReturns}
                title="Monthly Relative Returns (%)"
              />
            </>
          )}
        </GridItem>
      </GridContainer>
    </>
  );
};

export default memo(DfRendement);
