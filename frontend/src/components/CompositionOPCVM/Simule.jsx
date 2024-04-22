import React from "react";
import Table from "../Table";
import { simColumns } from "./columns";
import AccordionBox from "../Ui/AccordionBox";
import PtfPoids from "../charts/Backtest/PtfPoids";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const Simule = ({ data }) => {
  return (
    <AccordionBox title="Simulation" isExpanded>
      <GridContainer extraCss="my-8">
        <GridItem>
          <Table rows={data} columns={simColumns} pageSize={10} />
        </GridItem>
        <GridItem>
          <PtfPoids data={data} field="Poids" title="Composition Proxy" />
        </GridItem>
      </GridContainer>
    </AccordionBox>
  );
};

export default Simule;
