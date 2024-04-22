import { Alert, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterMarkoData, setValeurs } from "../../redux/slices/DataSlice";
import AccordionBox from "../Ui/AccordionBox";
import RangeSlider from "../SliderCom";
import Contrainte from "../Contrainte";
import ResetButton from "../ResetButton";
import { Tool } from "react-feather";

const getValueRangeFromStars = (stars) => {
  switch (stars) {
    case 0:
      return { min: 0, max: 9999 };
    case 1:
      return { min: 10000, max: 49999 };
    case 2:
      return { min: 50000, max: 199999 };
    case 3:
      return { min: 200000, max: 599999 };
    case 4:
      return { min: 600000, max: 999999 };
    case 5:
      return { min: 1000000, max: Infinity };
    default:
      return null;
  }
};

function Contraintes() {
  const { filterMarko } = useSelector((state) => state.rapport);
  const dispatch = useDispatch();
  const [states, setStates] = useState(filterMarko.contraintes);
  const handleSearch = () => {
    console.log("states", states);
    const vqmMinMax = getValueRangeFromStars(5);
    const fin = filterMarko.data.find(
      (item) => item.LIBELLE === "ATTIJARIWAFA BANK"
    );
    console.log("find", fin);
    const filtered = filterMarko.data.filter((item) => {
      return (
        +(item.Performance * 100).toFixed(2) >= states.performance.min &&
        +(item.Performance * 100).toFixed(2) <= states.performance.max &&
        +(item.Volatilite * 100).toFixed(2) >= states.volatilite.min &&
        +(item.Volatilite * 100).toFixed(2) <= states.volatilite.max &&
        +item.VQM.toFixed(2) >= states.vqm.min &&
        +item.VQM.toFixed(2) <= states.vqm.max &&
        item.Nb_Semaine >= states.nbSemaine.min &&
        item.Nb_Semaine <= states.nbSemaine.max
      );
    });
    console.log("filtered", filtered);
    dispatch(setFilterMarkoData(filtered));
    dispatch(setValeurs(filtered));
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
              min={filterMarko.contraintes.performance.min}
              max={filterMarko.contraintes.performance.max}
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
              min={filterMarko.contraintes.volatilite.min}
              max={filterMarko.contraintes.volatilite.max}
              label="volatilite"
              minLabel={"Moins Risqué"}
              maxLabel={"Plus Risqué"}
              onValuesChange={handleSliderChange}
              values={[states.volatilite.min, states.volatilite.max]}
              step={0.01}
            />
          </Contrainte>
          <Contrainte label="VQM">
            <RangeSlider
              min={filterMarko.contraintes.vqm.min}
              max={filterMarko.contraintes.vqm.max}
              step={10}
              label={"vqm"}
              minLabel={"Illiquide"}
              maxLabel={"Liquide"}
              percentage={false}
              onValuesChange={handleSliderChange}
              values={[states.vqm.min, states.vqm.max]}
            />
          </Contrainte>
          <Contrainte label="Nb. semaines">
            <RangeSlider
              min={filterMarko.contraintes.nbSemaine.min}
              max={filterMarko.contraintes.nbSemaine.max}
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
        <Box className="flex flex-col  max-w-[215px]">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSearch}
          >
            Appliquer les contraintes
          </Button>
          <ResetButton handleReset={() => setStates(filterMarko.contraintes)} />
        </Box>
      </AccordionBox>
    </>
  );
}

export default Contraintes;
