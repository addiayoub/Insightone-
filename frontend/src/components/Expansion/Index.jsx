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

const Index = () => {
  const { data, loading } = useSelector((state) => state.expansion);
  console.log("data", data);
  const isLoading = loading;
  return (
    <>
      <Filter />
      <Box>
        {!loading && data.analyseQuatile.length > 0 && (
          <AnalyseQuatile data={data.analyseQuatile} />
        )}
        {!loading && data.fondsVersusCat3.length > 0 && (
          <FondsVersus data={data.fondsVersusCat3} />
        )}

        {!loading && data.performance.length > 0 && (
          <>
            <Table
              columns={performanceColumns}
              rows={data.performance}
              pageSize={50}
            />
          </>
        )}
        {!loading && data.loeilExpert.length > 0 && (
          <>
            <Table
              columns={loeilExpertColumns}
              rows={data.loeilExpert}
              pageSize={50}
            />
          </>
        )}
        {!loading && data.indicateursRisque.length > 0 && (
          <>
            <Table
              columns={indicateursRisqueColumns}
              rows={data.indicateursRisque}
              pageSize={50}
            />
          </>
        )}
        {!loading && data.barometreQuantalys.length > 0 && (
          <Table
            columns={barometreColumns}
            rows={data.barometreQuantalys}
            pageSize={50}
          />
        )}
        {!loading && data.classementPerformance.length > 0 && (
          <Table
            columns={classementPerfColumns}
            rows={data.classementPerformance}
            pageSize={50}
          />
        )}
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
