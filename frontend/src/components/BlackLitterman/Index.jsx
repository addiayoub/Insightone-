import React, { memo } from "react";
import Filter from "./Filter";
import ValueAtRisk from "./ValueAtRisk/Index.jsx";
import PortfolioOptim from "./PortfolioOptim/Index.jsx";
import MeanRiskOpti from "./MeanRiskOpti/Index.jsx";
import PortfolioAllocation from "./PortfolioAllocation/Index.jsx";

const Index = () => {
  return (
    <>
      <ValueAtRisk />
      <PortfolioOptim />
      <PortfolioAllocation />
      {/* <MeanRiskOpti /> */}
    </>
  );
};

export default memo(Index);
