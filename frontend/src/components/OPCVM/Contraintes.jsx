import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionBox from "../AccordionBox";
import RangeSlider from "../SliderCom";
import Contrainte from "../Contrainte";
import {
  setFilteredDataSet,
  setFilteredData,
  setLibelles,
} from "../../redux/slices/OpcvmSlice";
import ResetButton from "../ResetButton";
import filterDataSet from "../../utils/filterDataSet";
import { Tool } from "react-feather";

function Contraintes() {
  const { data, dataSet } = useSelector((state) => state.opcvm);
  console.log("contrainte data", data);
  const dispatch = useDispatch();
  const [states, setStates] = useState(data.contraintes);
  const handleSearch = () => {
    console.log("states", states);
    const filtered = data.data.filter((item) => {
      return (
        +(item.Performance * 100).toFixed(2) >= states.performance.min &&
        +(item.Performance * 100).toFixed(2) <= states.performance.max &&
        +(item.Volatilite * 100).toFixed(2) >= states.volatilite.min &&
        +(item.Volatilite * 100).toFixed(2) <= states.volatilite.max &&
        +(item.EM_Hebdo / 1e6).toFixed(2) >= states.cours.min &&
        +(item.EM_Hebdo / 1e6).toFixed(2) <= states.cours.max &&
        item.Nb_Semaine >= states.nbSemaine.min &&
        item.Nb_Semaine <= states.nbSemaine.max
      );
    });
    console.log("filtered", filtered);
    dispatch(setFilteredData(filtered));
    dispatch(setLibelles(filtered));
    const keysToFilter = filtered.map((item) => item.DENOMINATION_OPCVM);
    const filteredDataSet = filterDataSet(dataSet.data, keysToFilter);
    dispatch(setFilteredDataSet(filteredDataSet));
  };
  const handleSliderChange = (label, sliderValues) => {
    setStates((prevState) => ({
      ...prevState,
      [label]: { min: +sliderValues[0], max: +sliderValues[1] },
    }));
  };

  return (
    <>
      <AccordionBox
        title={"Contraintes sur l'univers"}
        detailsClass={"flex justify-between items-center flex-wrap gap-y-2"}
        Icon={Tool}
      >
        <Box>
          <Contrainte label="Performance">
            <RangeSlider
              min={data.contraintes.performance.min}
              max={data.contraintes.performance.max}
              minLabel={"Moins Rentable"}
              maxLabel={"Plus Rentable"}
              step={0.01}
              label="performance"
              onValuesChange={handleSliderChange}
              values={[states.performance.min, states.performance.max]}
            />
          </Contrainte>
          <Contrainte label="Volatilité">
            <RangeSlider
              min={data.contraintes.volatilite.min}
              max={data.contraintes.volatilite.max}
              label="volatilite"
              minLabel={"Moins Risqué"}
              maxLabel={"Plus Risqué"}
              onValuesChange={handleSliderChange}
              values={[states.volatilite.min, states.volatilite.max]}
              step={0.01}
            />
          </Contrainte>
          <Contrainte label="Encours (MMAD)">
            <RangeSlider
              min={data.contraintes.cours.min}
              max={data.contraintes.cours.max}
              step={10}
              label={"cours"}
              minLabel={"Illiquide"}
              maxLabel={"Liquide"}
              percentage={false}
              onValuesChange={handleSliderChange}
              values={[states.cours.min, states.cours.max]}
            />
          </Contrainte>
          <Contrainte label="Nb. semaines">
            <RangeSlider
              min={data.contraintes.nbSemaine.min}
              max={data.contraintes.nbSemaine.max}
              step={1}
              label={"nbSemaine"}
              minLabel={""}
              maxLabel={""}
              int={true}
              percentage={false}
              onValuesChange={handleSliderChange}
              values={[states.nbSemaine.min, states.nbSemaine.max]}
            />
          </Contrainte>
        </Box>
        <Box className="flex flex-col max-w-[215px]">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSearch}
          >
            Appliquer les contraintes
          </Button>
          <ResetButton handleReset={() => setStates(data.contraintes)} />
        </Box>
      </AccordionBox>
    </>
  );
}

export default Contraintes;
