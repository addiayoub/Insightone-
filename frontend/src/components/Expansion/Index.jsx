import React from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import Table from "../Table";
import { performanceColumns } from "./columns";
import AnalyseQuatile from "../charts/Expansion/AnalyseQuatile";

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
        {!loading && data.performance.length > 0 && (
          <Table
            columns={performanceColumns}
            rows={data.performance}
            pageSize={50}
          />
        )}
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
