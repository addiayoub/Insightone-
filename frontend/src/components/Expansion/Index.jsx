import React from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import Table from "../Table";
import {
  barometreColumns,
  classementPerfColumns,
  indicateursRisqueColumns,
  loeilExpertColumns,
  performanceColumns,
} from "./columns";
import AnalyseQuatile from "../charts/Expansion/AnalyseQuatile";
import FondsVersus from "../charts/Expansion/FondsVersus";
import PreQuantile from "../charts/Expansion/PreQuantile";
import QuatileSemaine from "../charts/Expansion/QuatileSemaine";
import Consistency from "../charts/Expansion/Consistency";
import GridContainer, { GridItem } from "../Ui/GridContainer";

const Index = () => {
  const { data, loading } = useSelector((state) => state.expansion);
  console.log("data", data);
  const isLoading = loading;
  return (
    <>
      <Filter />
      <Box>
        <GridContainer extraCss="items-center">
          {!loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <AnalyseQuatile data={data.analyseQuatile} />
            </GridItem>
          )}
          {!loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <PreQuantile data={data.analyseQuatile} />
            </GridItem>
          )}
        </GridContainer>
        <GridContainer extraCss="items-center my-4">
          {!loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <QuatileSemaine data={data.analyseQuatile} />
            </GridItem>
          )}
          {!loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <Consistency chartData={data.analyseQuatile} />
            </GridItem>
          )}
        </GridContainer>
        {!loading && data.fondsVersusCat3.length > 0 && (
          <FondsVersus data={data.fondsVersusCat3} />
        )}
        {!loading && data.performance.length > 0 && (
          <Box>
            <h3>Perfromance</h3>
            <Table
              columns={performanceColumns}
              rows={data.performance}
              pageSize={50}
            />
          </Box>
        )}
        <GridContainer extraCss="mt-8 mb-12">
          {!loading && data.loeilExpert.length > 0 && (
            <GridItem>
              <h3>L'œil de l'expert</h3>
              <Table
                columns={loeilExpertColumns}
                rows={data.loeilExpert}
                pageSize={50}
              />
            </GridItem>
          )}
          {!loading && data.indicateursRisque.length > 0 && (
            <GridItem>
              <h3>Indicateurs de risque</h3>
              <Table
                columns={indicateursRisqueColumns}
                rows={data.indicateursRisque}
                pageSize={50}
              />
            </GridItem>
          )}
        </GridContainer>
        <GridContainer extraCss="mt-8">
          {!loading && data.barometreQuantalys.length > 0 && (
            <GridItem>
              <h3>Baromètre ID&A TECH</h3>
              <Table
                columns={barometreColumns}
                rows={data.barometreQuantalys}
                pageSize={50}
              />
            </GridItem>
          )}
          {!loading && data.classementPerformance.length > 0 && (
            <GridItem>
              <h3>Classement de la performance</h3>
              <Table
                columns={classementPerfColumns}
                rows={data.classementPerformance}
                pageSize={50}
              />
            </GridItem>
          )}
        </GridContainer>
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
