import React, { memo, useState, useEffect } from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";
import Upload from "../../../Backtest/UploadPtf/Upload";

const Index = ({ type = "Actions" }) => {
  const [showFilter, setShowFilter] = useState(false);
  const {
    meanRiskOpti: { data, loading, error },
  } = useSelector((state) => state.blackLitterman);
  const show = !loading;
  const [key, setKey] = useState(0); // force render
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [type]);

  return (
    <React.Fragment key={key}>
      <Upload
        key={key}
        show={showFilter}
        setShow={setShowFilter}
        ptfsType={type}
      />
      {showFilter && <Filter />}
      {/* <Views /> */}
      {loading && <MainLoader />}
      {/* {show && data.assetClasses.length > 0 && (
        <Table rows={data.assetClasses} columns={assetClassesColumns} />
      )}
      {show && data.weights.length > 0 && (
        <SharpeMeanVar data={data.weights} title="Sharpe Mean Variance" />
      )}
      {show && data.weightsBl.length > 0 && (
        <SharpeMeanVar data={data.weightsBl} title="Sharpe Black Litterman" />
      )}
      {show && data.weightsBl.length > 0 && <Frontier data={data.frontier} />}
      {show && data.ws.length > 0 && <RiskMeasures data={data.ws} />}
      {show && data.ws.length > 0 && data.mu.length > 0 && (
        <FrontierMean xAxisData={data.mu[0]} yAxisData={data.ws} />
      )} */}
    </React.Fragment>
  );
};

export default memo(Index);
