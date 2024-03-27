import React from "react";
import Table from "../Table";
import { dividendeCols } from "./columns";
import DividenedeChart from "../charts/ProfileFin/DividenedeChart";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const Dividende = ({ data }) => {
  return (
    <GridContainer>
      <GridItem>
        <Table
          columns={dividendeCols}
          rows={data}
          pageSize={50}
          density="compact"
        />
      </GridItem>
      <GridItem>
        <DividenedeChart data={data} />
      </GridItem>
    </GridContainer>
  );
};

export default Dividende;
