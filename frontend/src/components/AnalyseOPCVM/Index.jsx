import React, { useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import Table from "../Table";
import {
  barometreColumns,
  bearColumns,
  bullColumns,
  classementPerfColumns,
  indicateursRisqueColumns,
  loeilExpertColumns,
  performanceColumns,
  sidewaysColumns,
} from "./columns";
import AnalyseQuatile from "../charts/AnalyseOPCVM/AnalyseQuatile";
import FondsVersus from "../charts/AnalyseOPCVM/FondsVersus";
import PreQuantile from "../charts/AnalyseOPCVM/PreQuantile";
import QuatileSemaine from "../charts/AnalyseOPCVM/QuatileSemaine";
import Consistency from "../charts/AnalyseOPCVM/Consistency";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Guages from "../charts/AnalyseOPCVM/Guages";
import AccordionBox from "../AccordionBox";

const Index = () => {
  const { data, loading } = useSelector((state) => state.expansion);
  const [isShow, setIsShow] = useState(false);
  console.log("data", data);
  const isLoading = loading;
  const showData = !isLoading && isShow;
  return (
    <>
      <Filter setIsShow={setIsShow} />
      <Box>
        <GridContainer extraCss="items-center">
          {showData && !loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <AnalyseQuatile data={data.analyseQuatile} />
            </GridItem>
          )}
          {showData && !loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <PreQuantile data={data.analyseQuatile} />
            </GridItem>
          )}
        </GridContainer>
        <GridContainer extraCss="items-center my-4">
          {showData && !loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <QuatileSemaine data={data.analyseQuatile} />
            </GridItem>
          )}
          {showData && !loading && data.analyseQuatile.length > 0 && (
            <GridItem>
              <Consistency chartData={data.analyseQuatile} />
            </GridItem>
          )}
        </GridContainer>
        {showData && !loading && data.fondsVersusCat3.length > 0 && (
          <FondsVersus
            data={[...data.fondsVersusCat3, ...data.fondsVersusCat2]}
          />
        )}
        {showData && !loading && data.performance.length > 0 && (
          <Box>
            <h3>Perfromance</h3>
            <Table
              columns={performanceColumns}
              rows={data.performance}
              pageSize={50}
            />
          </Box>
        )}
        <GridContainer extraCss="mt-8 mb-12 gap-4">
          {showData && !loading && data.loeilExpert.length > 0 && (
            <GridItem>
              <h3>L'œil de l'expert</h3>
              <Table
                columns={loeilExpertColumns}
                rows={data.loeilExpert}
                pageSize={50}
              />
            </GridItem>
          )}
          {showData && !loading && data.indicateursRisque.length > 0 && (
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
        <GridContainer extraCss="my-24 gap-4">
          {showData && !loading && data.barometreQuantalys.length > 0 && (
            <GridItem>
              <h3>Baromètre ID&A TECH</h3>
              <Table
                columns={barometreColumns}
                rows={data.barometreQuantalys}
                pageSize={50}
              />
            </GridItem>
          )}
          {showData && !loading && data.classementPerformance.length > 0 && (
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
        {showData && !loading && data.indicateursPerfRisque.length > 0 && (
          <AccordionBox title="Indicateurs" isExpanded>
            <Guages data={data.indicateursPerfRisque} />
          </AccordionBox>
        )}
        {showData && !loading && data.analyseLipper1.length > 0 && (
          <GridContainer extraCss="items-center gap-x-4 my-8" xGap={4}>
            <GridItem cols={4}>
              <h3>BEAR MARKET</h3>
              <Table rows={data.analyseLipper1} columns={bearColumns} />
            </GridItem>
            <GridItem cols={4}>
              <h3>SIDEWAYS MARKET</h3>
              <Table rows={data.analyseLipper1} columns={sidewaysColumns} />
            </GridItem>
            <GridItem cols={4}>
              <h3>BULL MARKET</h3>
              <Table rows={data.analyseLipper1} columns={bullColumns} />
            </GridItem>
          </GridContainer>
        )}
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
