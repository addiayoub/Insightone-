import { Box } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getComparaison,
  getFirstGraph,
  getIndicesChart,
  getRendementRisqueData,
} from "../../redux/actions/DataActions";
import { logout } from "../../redux/slices/AuthSlice";
import groupBy from "../../utils/groupBy";
import AccordionBox from "../Ui/AccordionBox";
import MainLoader from "../loaders/MainLoader";
import RendementRisqueScatter from "../charts/RendementRisqueScatter";
import ChartContainer from "../ChartContainer";
import RendementRisqueData from "./RendementRisqueData";
import IndicesComponent from "../IndicesComponent";
import IndicesChart from "../charts/IndicesChart";
import ComparaisonIndices from "../charts/ComparaisonIndices";
import PerformanceChart from "../charts/PerformanceChart";
import VolatiliteChart from "../charts/VolatiliteChart";
import { ValidateButton } from "../Ui/Buttons";

function Indices({ dateDebut, dateFin }) {
  const dispatch = useDispatch();
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState([]);
  const [showCompa, setShowCompa] = useState(false);
  const [compaData, setCompaData] = useState([]);
  const [loadingIndicesChart, setLoadingIndicesChart] = useState(false);
  const [loadingCompa, setLoadingCompa] = useState(false);
  const [g1Data, setG1Data] = useState([]);
  const [g2Data, setG2Data] = useState([]);
  const [rendementRisqueData, setRendementRisqueData] = useState([]);

  const showComparaison = useCallback(() => {
    setLoadingCompa(true);
    dispatch(getComparaison({ dateDebut, dateFin, indices: selectedIndices }))
      .unwrap()
      .then(({ data }) => {
        const groupedData = groupBy(data, "NOM_INDICE");
        setCompaData(groupedData);
        setShowCompa(true);
      })
      .finally(() => {
        setLoadingCompa(false);
      });
  }, [dateDebut, dateFin, selectedIndices]);

  const showPerformanceChart = useCallback(() => {
    dispatch(getFirstGraph({ dateDebut, dateFin, indices: selectedIndices }))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        const groupedData = groupBy(data, "NOM_INDICE");
        setG1Data(groupedData);
        setG2Data(groupedData);
      });
  }, [dateDebut, dateFin, selectedIndices]);

  const showRendementRisqueChart = useCallback(() => {
    dispatch(
      getRendementRisqueData({ dateDebut, dateFin, indices: selectedIndices })
    )
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        setRendementRisqueData(data);
      });
  }, [dateDebut, dateFin, selectedIndices]);
  const handleSearch = useCallback(() => {
    showComparaison();
    showPerformanceChart();
    showRendementRisqueChart();
  }, [dateDebut, dateFin, selectedIndices]);

  useEffect(() => {
    setShowCompa(false);
    if (selectedIndices.length > 0) {
      setLoadingIndicesChart(true);
      dispatch(
        getIndicesChart({ dateDebut, dateFin, indices: selectedIndices })
      )
        .unwrap()
        .then(({ data }) => {
          const groupedData = groupBy(data, "NOM_INDICE");
          setData(groupedData);
          setIsShow(true);
        })
        .catch((rejectedValue) => {
          console.log("DATA rejectedValue", rejectedValue);
          if (rejectedValue.status) {
            dispatch(logout());
          }
          // notyf.error(rejectedValue);
        })
        .finally(() => setLoadingIndicesChart(false));
    } else {
      setIsShow(false);
    }
  }, [selectedIndices]);
  return (
    <>
      <AccordionBox title={"Selection des indices"}>
        <Box>
          <IndicesComponent
            setSelectedIndices={setSelectedIndices}
            selectedIndices={selectedIndices}
            disableCloseOnSelect
            blurOnSelect
          />
          {loadingIndicesChart && <MainLoader />}
          <ChartContainer width={400}>
            {isShow && !loadingIndicesChart && (
              <>
                {/* <IndicesChart data={data} /> */}
                <IndicesChart data={data} />
              </>
            )}
            {showCompa && (
              <>
                {/* <ComparaisonIndices data={compaData} /> */}
                <ComparaisonIndices data={compaData} />
              </>
            )}
          </ChartContainer>
        </Box>
        <Box className="block max-w-[400px] mt-4 mx-auto">
          <ValidateButton
            fullWidth
            onClick={handleSearch}
            disabled={
              selectedIndices.length < 1 || loadingCompa || loadingIndicesChart
            }
          />
        </Box>
        {loadingCompa && <MainLoader />}
        {showCompa && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 mt-24">
              <div className="md:col-span-5 lg:col-span-5 xl:col-span-5">
                <RendementRisqueData data={rendementRisqueData} />
              </div>
              <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
                <RendementRisqueScatter data={rendementRisqueData} />
              </div>
            </div>
            <ChartContainer width={400}>
              {/* <PerformanceChart data={g1Data} /> */}
              <PerformanceChart data={g1Data} />
              {/* <VolatiliteChart data={g2Data} /> */}
              <VolatiliteChart data={g2Data} />
            </ChartContainer>
          </>
        )}
      </AccordionBox>
    </>
  );
}

export default memo(Indices);
