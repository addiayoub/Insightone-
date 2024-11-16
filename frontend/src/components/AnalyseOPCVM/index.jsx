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
import AccordionBox from "../Ui/AccordionBox";
import PerformanceTables from "./PerformanceTables";
import { Aperture, BarChart, Table as TableIcon } from "react-feather";
import { PresentionChart } from "iconsax-react";

const Index = () => {
  const { data, loading } = useSelector((state) => state.analyseOPCVM);
  const [isShow, setIsShow] = useState(false);
  console.log("data", ...data.fondsVersusCat1);
  const showData = !loading && isShow;
  const showEvol =
    showData &&
    (data.analyseQuatile.length > 0 || data.analyseQuatile.length > 0);
  const showAnaly =
    showData &&
    (data.analyseQuatile.length > 0 || data.analyseQuatile.length > 0);
  const showAnalyStyle =
    showData &&
    (data.loeilExpert.length > 0 ||
      data.indicateursRisque.length > 0 ||
      data.barometreQuantalys.length > 0 ||
      data.classementPerformance.length > 0);
  return (
    <>
      <Filter setIsShow={setIsShow} />
      <Box>
        {showEvol && (
          <AccordionBox
            title="Evolution de la valeur liquidative"
            isExpanded
            Icon={PresentionChart}
          >
            <GridContainer extraCss="items-center">
              {data.analyseQuatile.length > 0 && (
                <GridItem>
                  <AnalyseQuatile data={data.analyseQuatile} />
                </GridItem>
              )}
              {data.analyseQuatile.length > 0 && (
                <GridItem>
                  <PreQuantile data={data.analyseQuatile} />
                </GridItem>
              )}
            </GridContainer>
          </AccordionBox>
        )}
        {showAnaly && (
          <AccordionBox title="Analyse statistique" isExpanded Icon={BarChart}>
            <GridContainer extraCss="items-center my-4">
              {data.analyseQuatile.length > 0 && (
                <GridItem>
                  <QuatileSemaine data={data.analyseQuatile} />
                </GridItem>
              )}
              {data.analyseQuatile.length > 0 && (
                <GridItem>
                  <Consistency chartData={data.analyseQuatile} />
                </GridItem>
              )}
            </GridContainer>
          </AccordionBox>
        )}
        {showData && data.fondsVersusCat3.length > 0 && (
          <AccordionBox
            isExpanded
            title="Comparatif des fonds concurents: Rendement/Risque"
            Icon={Aperture}
          >
            <FondsVersus
              data={[...data.fondsVersusCat3, ...data.fondsVersusCat2 , ...data.fondsVersusCat1]}
            />
          </AccordionBox>
        )}
        {showData && data.performance.length > 0 && (
          <AccordionBox
            title="Indicateurs glissants"
            isExpanded
            Icon={TableIcon}
          >
            <PerformanceTables data={data.performance} />
            {/* <h3>Performance</h3>
            <Table
              columns={performanceColumns}
              rows={data.performance[0]}
              pageSize={50}
            /> */}
          </AccordionBox>
        )}
        {showAnalyStyle && (
          <AccordionBox title="Analyse de style" isExpanded Icon={TableIcon}>
            <GridContainer extraCss="my-4 gap-4">
              {data.loeilExpert.length > 0 && (
                <GridItem>
                  <Table
                    columns={loeilExpertColumns}
                    rows={data.loeilExpert}
                    pageSize={50}
                    legend="L'œil de l'expert"
                  />
                </GridItem>
              )}
              {data.indicateursRisque.length > 0 && (
                <GridItem>
                  <Table
                    columns={indicateursRisqueColumns}
                    rows={data.indicateursRisque}
                    pageSize={50}
                    legend="Indicateurs de risque"
                  />
                </GridItem>
              )}
            </GridContainer>
            <GridContainer extraCss="my-4 gap-4">
              {data.barometreQuantalys.length > 0 && (
                <GridItem>
                  <Table
                    columns={barometreColumns}
                    rows={data.barometreQuantalys}
                    pageSize={50}
                    legend="Baromètre ID&A TECH"
                  />
                </GridItem>
              )}
              {data.classementPerformance.length > 0 && (
                <GridItem>
                  <Table
                    columns={classementPerfColumns}
                    rows={data.classementPerformance}
                    pageSize={50}
                    legend="Classement de la performance"
                  />
                </GridItem>
              )}
            </GridContainer>
          </AccordionBox>
        )}

        {showData && data.indicateursPerfRisque.length > 0 && (
          <AccordionBox title="Indicateurs" isExpanded>
            <Guages data={data.indicateursPerfRisque} />
          </AccordionBox>
        )}
        {showData && data.analyseLipper1.length > 0 && (
          <GridContainer extraCss="items-center gap-x-4 my-8" xGap={4}>
            <GridItem cols={4}>
              <Table
                rows={data.analyseLipper1}
                columns={bearColumns}
                legend="BEAR MARKET"
              />
            </GridItem>
            <GridItem cols={4}>
              <Table
                rows={data.analyseLipper1}
                columns={sidewaysColumns}
                legend="SIDEWAYS MARKET"
              />
            </GridItem>
            <GridItem cols={4}>
              <Table
                rows={data.analyseLipper1}
                columns={bullColumns}
                legend="BULL MARKET"
              />
            </GridItem>
          </GridContainer>
        )}
      </Box>
      {loading && <MainLoader />}
    </>
  );
};

export default Index;
