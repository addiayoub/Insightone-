import React from "react";
import Table from "../Table";
import { useSelector } from "react-redux";
import { res, resumeCols } from "./columns";
import Chart from "../charts/ProfileFin/DataChart";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const ElemeFin = () => {
  const { data } = useSelector((state) => state.profileFin);

  return (
    <>
      {data?.cmptResResu.length > 0 && (
        <GridContainer>
          <GridItem extraCss="h-fit">
            <h4>Compte de résultat</h4>
            <Table
              rows={data?.cmptResResu}
              // columns={resumeCols(data?.cmptResResu)}
              columns={res}
              pageSize={50}
              density={"compact"}
            />
          </GridItem>
          <GridItem extraCss="h-fit">
            <Chart data={data?.cmptResResu} type="compte de résultat" />
          </GridItem>
        </GridContainer>
      )}

      {data?.bilanRes.length > 0 && (
        <GridContainer>
          <GridItem extraCss="h-fit">
            <h4>Bilan comptable</h4>
            <Table
              rows={data?.bilanRes}
              columns={resumeCols(data?.bilanRes)}
              pageSize={50}
              density={"compact"}
            />
          </GridItem>
          <GridItem extraCss="h-fit">
            <Chart data={data?.bilanRes} type="bilan" />
          </GridItem>
        </GridContainer>
      )}

      {data?.fluxRes.length > 0 && (
        <GridContainer>
          <GridItem extraCss="h-fit">
            <h4>Tableau des flux de trésorerie</h4>
            <Table
              rows={data?.fluxRes}
              columns={resumeCols(data?.fluxRes)}
              pageSize={50}
              density={"compact"}
            />
          </GridItem>
          <GridItem extraCss="h-fit">
            <Chart data={data?.fluxRes} type="flux" />
          </GridItem>
        </GridContainer>
      )}
    </>
  );
};

export default ElemeFin;
