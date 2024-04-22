import React, { useState, useEffect, memo } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredDataSet } from "../../redux/slices/OpcvmSlice";
import { getChartData, getMatriceCorr } from "../../redux/actions/OpcvmActions";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import AccordionBox from "../Ui/AccordionBox";
import Heatmap from "../charts/Heatmap";
import ChartContainer from "../ChartContainer";
import filterDataSet from "../../utils/filterDataSet";
import groupBy from "../../utils/groupBy";
import EChartsPreview from "./EchartPreview";
import NewUniversB100 from "./NewUniversB100";
import TransferList from "../TransferList";
import { ValidateButton } from "../Ui/Buttons";
import { MousePointer } from "react-feather";

function Univers({ dateDebut, dateFin, setContraintesOp }) {
  const {
    data: { libelles },
    dataSet,
    matriceCorr,
  } = useSelector((state) => state.opcvm);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(libelles);
  const [right, setRight] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("----checked----", checked);
    setIsLoading(true);
    if (checked.length > 0) {
      dispatch(getChartData({ dateDebut, dateFin, libelles: checked }))
        .unwrap()
        .then(({ data }) => {
          console.log("ChartData", data);
          const groupData = groupBy(data, "DENOMINATION_OPCVM");
          console.log("group data", groupData);
          setChartData(groupData);
          setShowChart(true);
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue", rejectedValue);
          notyf.error(rejectedValue);
        })
        .finally(() => setIsLoading(false));
    } else {
      setShowChart(false);
      setIsLoading(false);
    }
  }, [checked]);
  useEffect(() => {
    setContraintesOp(right.sort());
    const newDataSet = filterDataSet(dataSet.data, right);
    dispatch(setFilteredDataSet(newDataSet));
  }, [right]);

  useEffect(() => {
    setRight([]);
    setLeft(libelles);
  }, [libelles]);
  const getMatrice = () => {
    setIsLoading(true);
    dispatch(getMatriceCorr())
      .then(() => {
        setIsLoading(false);
        setShowHeatmap(true);
      })
      .catch(() => setShowHeatmap(false));
  };

  return (
    <>
      <AccordionBox title={"Selection de l'univers"} Icon={MousePointer}>
        <TransferList
          checked={checked}
          setChecked={setChecked}
          right={right}
          setRight={setRight}
          left={left}
          setLeft={setLeft}
        />
        {showChart && (
          <ChartContainer width={400}>
            <EChartsPreview data={chartData} />
            <NewUniversB100
              data={chartData}
              dateDebut={dateDebut}
              dateFin={dateFin}
            />
          </ChartContainer>
        )}
        <Box className="max-w-[400px] mx-auto mt-10">
          <ValidateButton fullWidth onClick={getMatrice} disabled={isLoading} />
        </Box>
      </AccordionBox>
      {isLoading && <MainLoader />}
      {!isLoading && showHeatmap && matriceCorr.data.length > 0 && (
        <AccordionBox
          title={"Matrice Correlation Covariance"}
          isExpanded={true}
        >
          <Heatmap data={matriceCorr.data} />
        </AccordionBox>
      )}
    </>
  );
}
export default memo(Univers);
