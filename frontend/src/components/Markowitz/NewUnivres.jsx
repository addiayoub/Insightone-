import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Matrice_correlation_Covariance,
  getChartData,
  getDataSet,
} from "../../redux/actions/DataActions";
import AccordionBox from "../Ui/AccordionBox";
import ChartPreview from "../charts/ChartPreview";
import Heatmap from "../charts/Heatmap";
import UniversB100 from "../charts/UniversB100";
import MainLoader from "../loaders/MainLoader";
import ChartContainer from "../ChartContainer";
import groupBy from "../../utils/groupBy";
import NewUniversB100 from "../charts/NewUniversB100";
import TransferList from "../TransferList";
import { ValidateButton } from "../Ui/Buttons";
import { MousePointer } from "react-feather";
import EchartPreview from "../charts/Markowitz/EchartPreview";

export default function NewUnivers({
  dateDebut,
  dateFin,
  setContraintesOptimisation,
}) {
  const { valeurs, matriceCorrelation, dataSet } = useSelector(
    (state) => state.rapport
  );
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(valeurs);
  const [right, setRight] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (checked.length > 0) {
      dispatch(getChartData({ dateDebut, dateFin, valeurs: checked }))
        .unwrap()
        .then(({ data }) => {
          const groupData = groupBy(data, "VALEUR");
          console.log("group data", groupData);
          setChartData(groupData);
          setShowChart(true);
        })
        .catch((rejectedValue) => {
          console.log("univers", rejectedValue);
          if (rejectedValue.status) {
            dispatch(logout());
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setShowChart(false);
    }
  }, [checked]);
  useEffect(() => {
    setContraintesOptimisation(right);
  }, [right]);

  useEffect(() => {
    setRight([]);
    setLeft(valeurs);
  }, [valeurs]);
  const getMatrice_correlation_Covariance = () => {
    setIsLoading(true);
    dispatch(getDataSet({ dateDebut, dateFin, valeurs: right }))
      .then(() => dispatch(Matrice_correlation_Covariance()))
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
            {/* <ChartPreview data={chartData} /> */}
            <EchartPreview data={chartData} />
            <NewUniversB100
              data={chartData}
              dateDebut={dateDebut}
              dateFin={dateFin}
            />
            {/* <UniversB100
              data={chartData}
              dateDebut={dateDebut}
              dateFin={dateFin}
            /> */}
          </ChartContainer>
        )}
        <Box className="max-w-[400px] mx-auto mt-10">
          <ValidateButton
            fullWidth
            disabled={isLoading || right.length < 1}
            onClick={getMatrice_correlation_Covariance}
          />
        </Box>
      </AccordionBox>
      {isLoading && <MainLoader />}
      {!isLoading && showHeatmap && matriceCorrelation.data.length > 0 && (
        <AccordionBox
          title={"Matrice Correlation Covariance"}
          isExpanded={true}
        >
          <Heatmap data={matriceCorrelation.data} />
        </AccordionBox>
      )}
    </>
  );
}
