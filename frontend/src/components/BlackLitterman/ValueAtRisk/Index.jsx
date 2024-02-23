import React, { memo, useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";
import ValueAtRiskRange from "../../charts/BlackLitterman/ValueAtRisk/ValueAtRiskRange";
import GridContainer, { GridItem } from "../../Ui/GridContainer";
import Table from "../../Table";
import {
  historicalVarColumns,
  parametricVarColumns,
  varCvarColumns,
} from "./columns";

const tables = ["historicalVar", "parametricVar", "varCvar"];

const Index = () => {
  const {
    valueAtRisk: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const [isShow, setIsShow] = useState(false);
  const show = isShow && !loading;
  return (
    <>
      <Filter {...{ setIsShow }} />
      {loading && <MainLoader />}
      {show && data.portfolioSims.length > 0 && (
        <ValueAtRiskRange data={data.portfolioSims} />
      )}
      {/* <GridContainer> */}
      <GridContainer extraCss="my-8">
        {show && data.historicalVar.length > 0 && (
          <GridItem cols={4}>
            <h3>Historical VaR</h3>
            <Table
              rows={data.historicalVar}
              columns={historicalVarColumns}
              className="h-fit"
            />
          </GridItem>
        )}
        {show && data.parametricVar.length > 0 && (
          <GridItem cols={4}>
            <h3>Parametric Var</h3>
            <Table
              rows={data.parametricVar}
              columns={parametricVarColumns}
              className="h-fit"
            />
          </GridItem>
        )}
        {show && data.varCvar.length > 0 && (
          <GridItem cols={4}>
            <h3>VaR CVaR</h3>
            <Table
              rows={data.varCvar}
              columns={varCvarColumns}
              className="h-fit"
            />
          </GridItem>
        )}
      </GridContainer>
      {/* {tables.map((tableName, index) => {
        return (
          data[tableName].length > 0 && (
            // <GridItem cols={4}>
            <DfContrib data={data[tableName]} title={tableName} key={index} />
            // </GridItem>
          )
        );
      })} */}
      {/* </GridContainer> */}
    </>
  );
};

export default memo(Index);
