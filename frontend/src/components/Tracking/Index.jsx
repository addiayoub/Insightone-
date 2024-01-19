import React, { useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import { moyColumns } from "./columns";
import { Box } from "@mui/material";
import EvolutionB100 from "../charts/EvolutionB100";

const Index = () => {
  const {
    generationPtfAlea: {
      loading,
      dataset,
      df_b100,
      df_moy,
      df_p,
      df_poids,
      df_result,
      df_t,
    },
  } = useSelector((state) => state.tracking);
  const [isShow, setIsShow] = useState(false);
  const isLoading = loading;
  const showData = !isLoading && isShow;
  return (
    <>
      <Filter setIsShow={setIsShow} />
      <Box>
        {showData && df_moy && <Table rows={df_moy} columns={moyColumns} />}
        {showData && df_b100 && (
          <EvolutionB100 data={df_b100} title="Evolution base 100" />
        )}
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
