import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import {
  axaBench,
  axaBenchRes,
  caBench,
  caBenchdRes,
  compFinMBI,
  evolMBI,
  evolMBIB100,
  mbiFields,
  statPro,
} from "./columns";
import { Box } from "@mui/material";
import Chart from "../charts/AnalyseMBI/Chart";
import EvolB100 from "../charts/AnalyseMBI/EvolB100";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Evol from "../charts/AnalyseMBI/Evol";
import Repartition from "../charts/AnalyseMBI/Repartition";
import PerfTable from "../PerfGlis/PerfTable";

const index = () => {
  const { data, loading } = useSelector((state) => state.analyseMBI);
  const show = !loading;
  console.log("analyse MBI ", data);
  return (
    <div>
      {loading && <MainLoader />}
      <Filter />
      {show && data.cumulAXABench.length > 0 && (
        <Box>
          <Table rows={data.cumulAXABench} columns={axaBench} pageSize={25} />
          <Table
            rows={data.cumulAXABenchRes}
            columns={axaBenchRes}
            pageSize={25}
          />
        </Box>
      )}
      {show && data.cumulCABench.length > 0 && (
        <Box>
          <Table rows={data.cumulCABench} columns={caBench} pageSize={25} />
          <Table
            rows={data.cumulCABenchRes}
            columns={caBenchdRes}
            pageSize={25}
          />
          <Chart data={data.cumulCABenchRes} />
        </Box>
      )}
      {show && data.cumulStatproBench.length > 0 && (
        <Box>
          <Table
            rows={data.cumulStatproBench}
            columns={statPro}
            pageSize={25}
          />
          {/* <Table
            rows={data.cumulCABenchRes}
            columns={caBenchdRes}
            pageSize={25}
          /> */}
          {/* <Chart data={data.cumulCABenchRes} /> */}
        </Box>
      )}
      {show && data.evolMBI.length > 0 && (
        <Box>
          <h3>Evolution MBI</h3>
          <Table rows={data.evolMBI} columns={evolMBI} pageSize={25} />
          {/* <Table
            rows={data.cumulCABenchRes}
            columns={caBenchdRes}
            pageSize={25}
          /> */}
          {/* <Chart data={data.cumulCABenchRes} /> */}
        </Box>
      )}
      {show && data.evolNomi.length > 0 && (
        <Box>
          <h3>Evolution Nominal</h3>
          <Table rows={data.evolNomi} columns={evolMBI} pageSize={25} />
        </Box>
      )}
      {show && data.evolMBIB100.length > 0 && (
        <GridContainer>
          <GridItem extraCss="h-fit">
            <h3>Evolution MBI base 100</h3>
            <Table
              rows={data.evolMBIB100}
              columns={evolMBIB100}
              pageSize={10}
            />
          </GridItem>
          <GridItem>
            <EvolB100 data={data.evolMBIB100} title="Evolution MBI B100" />
          </GridItem>
        </GridContainer>
      )}
      {show && data.evolNomiB100.length > 0 && (
        <GridContainer>
          <GridItem>
            <h3>Evolution Nominal base 100</h3>
            <Table
              rows={data.evolNomiB100}
              columns={evolMBIB100}
              pageSize={10}
            />
          </GridItem>
          <GridItem>
            <EvolB100 data={data.evolNomiB100} title="Evolution Nominal B100" />
          </GridItem>
        </GridContainer>
      )}
      {show && data.MBIFields.length > 0 && (
        <Box>
          <Box>
            <h3>MBI Fields</h3>
            <Table rows={data.MBIFields} columns={mbiFields} pageSize={10} />
          </Box>
          <Evol data={data.MBIFields} fields={["DURATION", "MOY_DURATION"]} />
          <Evol
            data={data.MBIFields}
            fields={["YTM", "COUPON"]}
            percentage={true}
          />
        </Box>
      )}
      {show && data.perfGlisMBI.length > 0 && (
        <>
          <PerfTable data={data.perfGlisMBI} isFirst title="Performance MBI" />
          <PerfTable
            data={data.perfGlisMBI}
            title="Performance MBI Annualisée"
          />
        </>
      )}
      {show && data.perfGlisNomi.length > 0 && (
        <>
          <PerfTable
            data={data.perfGlisNomi}
            isFirst
            title="Performance Performance Nominal"
          />
          <PerfTable
            data={data.perfGlisNomi}
            title="Performance Performance Nominal Annualisée"
          />
        </>
      )}
      {show && data.compFinMBI.length > 0 && (
        <Box>
          <Box>
            <h3>MBI Fields</h3>
            <Table rows={data.compFinMBI} columns={compFinMBI} pageSize={10} />
          </Box>
          <Repartition data={data.compFinMBI} />
          <Repartition data={data.compFinMBI} type="facial" />
          <Repartition data={data.compFinMBI} type="jouissance" />
        </Box>
      )}
    </div>
  );
};

export default index;
