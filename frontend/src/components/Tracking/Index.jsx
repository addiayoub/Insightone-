import React, { useState } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import EvolutionB100 from "../charts/EvolutionB100";
import Scatter from "../charts/Tracking/Scatter";
import PoidsChart from "../charts/Tracking/PoidsChart";
import Evolution from "../charts/Tracking/Evolution";
import filterData from "../../utils/filterData";
import DfRendement from "../DfRendement";

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
  const { backtestData: backData, selectedPtf } = useSelector(
    (state) => state.backtest
  );
  const [isShow, setIsShow] = useState(false);
  const isLoading = loading || backData.loading;
  const showData = !isLoading && isShow;

  return (
    <>
      <Filter setIsShow={setIsShow} />
      <Box className="my-8">
        {showData && df_b100 && (
          <>
            <EvolutionB100
              data={filterData(df_b100, [/SIM/, new RegExp(selectedPtf)])}
              title="Evolution base 100"
            />
            <Evolution data={df_b100} title="Evolution base 100" />
          </>
        )}
        {/* {showData && df_p && <EvolutionB100 data={df_p} title="DF p" />} */}
        {showData && df_result && <Scatter data={df_result} />}
        {showData && <DfRendement />}

        {/* {showData && df_poids && <PoidsChart data={df_poids} />} */}
      </Box>
      {isLoading && <MainLoader />}
    </>
  );
};

export default Index;
