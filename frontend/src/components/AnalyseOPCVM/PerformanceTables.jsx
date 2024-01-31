import React from "react";
import Table from "../Table";
import { performanceColumns } from "./columns";
import GridContainer, { GridItem } from "../Ui/GridContainer";
const titles = [
  "Performance",
  "Volatilité",
  "Sharpe",
  "Performance An",
  "Performance Annuelle",
];
const PerformanceTables = ({ data }) => {
  return (
    <GridContainer extraCss="my-12 gap-4">
      {data.map((tableRows, index) => {
        return (
          <GridItem key={index} cols={6} extraCss="h-fit">
            <h3>{titles[index]}</h3>
            <Table rows={tableRows} columns={performanceColumns} />
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default PerformanceTables;
