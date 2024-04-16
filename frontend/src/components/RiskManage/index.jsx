import React, { memo, useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import ValueAtRiskRange from "../charts/ValueAtRisk/ValueAtRiskRange";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Table from "../Table";
import {
  historicalVarColumns,
  parametricVarColumns,
  varCvarColumns,
} from "./columns";
import BackSimChart from "../charts/ValueAtRisk/BackSimChart";
import DistrubitionMonthly from "../charts/Backtest/DistrubitionMonthly";
import Prevision from "./Prevision";

const Index = () => {
  const { data, loading, error } = useSelector((state) => state.riskManage);
  const [isShow, setIsShow] = useState(false);
  const show = isShow && !loading;
  return (
    <>
      <Filter {...{ setIsShow }} />
      {loading && <MainLoader />}
      <GridContainer extraCss="items-start">
        {show && data.resume.length > 0 && (
          <GridItem>
            <Prevision data={data.resume} />
          </GridItem>
        )}
        {show && data.varCvar.length > 0 && (
          <GridItem>
            <Table
              rows={data.varCvar}
              columns={varCvarColumns}
              className="h-fit"
              legend={"VaR CVaR"}
            />
          </GridItem>
        )}
      </GridContainer>

      <GridContainer extraCss="items-end my-8">
        <GridItem>
          {show && data.backSim && <BackSimChart data={data.backSim} />}
        </GridItem>
        <GridItem>
          {show && data.ptfSim && <ValueAtRiskRange data={data.ptfSim} />}
        </GridItem>
      </GridContainer>
      {show && data.histoVar.length > 0 && (
        <DistrubitionMonthly data={data.histoVar} />
      )}
    </>
  );
};

export default memo(Index);
