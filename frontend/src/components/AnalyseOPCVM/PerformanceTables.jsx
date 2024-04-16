import React from "react";
import Table from "../Table";
import { performanceColumns } from "./columns";
import GridContainer, { GridItem } from "../Ui/GridContainer";
const titles = [
  "Performance",
  "Volatilité",
  "Sharpe",
  "Performance Annualisée",
  "Performance Annuelle",
];
const PerformanceTables = ({ data }) => {
  return (
    <GridContainer extraCss="my-4 gap-4">
      {data.map((tableRows, index) => {
        return (
          <GridItem key={titles[index]} cols={6} extraCss="h-fit">
            <Table
              rows={tableRows}
              columns={performanceColumns}
              legend={titles[index]}
            />
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default PerformanceTables;
