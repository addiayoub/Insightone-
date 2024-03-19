import React, { useState } from "react";
import { Box } from "@mui/material";
import { Tool } from "react-feather";
import RadioBtn from "../Markowitz/RadioBtn";
import ContraintesOpValue from "../Markowitz/ContraintesOpValue";
import ContraintesOpResult from "../Markowitz/ContraintesOpResult";
import { ValidateButton } from "../Ui/Buttons";
import SelectMultipl from "../SelectMultipl";
import AccordionBox from "../AccordionBox";
import { v4 as uuidv4 } from "uuid";

const titres = [
  "AD BALANCED FUND",
  "AD BONDS",
  "AD CASH",
  "AD COMPACT OBLIGATAIRE",
  "AD FIXED INCOME FUND",
  "AD MOROCCAN EQUITY FUND",
  "AD SELECT BANK",
  "AD YIELD FUND",
  "AFG CASH MANAGEMENT",
  "AFG DYNAMIC FUND",
  "AFG INCOME FUND",
  "AFG LIQUIDITY FUND",
  "AFG OPTIMAL FUND",
  "AFRICAPITAL BONDS",
  "AFRICAPITAL CASH",
  "AFRICAPITAL EQUITY",
  "AFRICAPITAL LIQUIDITY",
  "AFRICAPITAL SECURITE",
  "FCP AFRICAPITAL CASH PLUS",
  "FCP AFRICAPITAL DIVERSIFIE",
];

const ContraintesOp = () => {
  const [selectedTitres, setSelectedTitres] = useState([]);
  const [operateur, setOperateur] = useState(">=");
  const [opValue, setOpValue] = useState("");
  const [contrainteVal, setContraintVal] = useState([]);
  const [contrainteRelaVal, setContrainteRelaVal] = useState([]);
  const [error, setError] = useState("");

  const handleContrainteVal = (array) => {
    setContraintVal(array);
  };
  const handleContrainteRelaVal = (array) => setContrainteRelaVal(array);

  const handleChangeMultiple = () => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedTitres(value);
  };

  const handleClick = (choice, operator, value) => {
    if (selectedTitres.length > 0 && value !== "") {
      const selectedChoice = selectedTitres.map((indice) => ({
        id: uuidv4(),
        indice,
        operateur: operator,
        value: +value,
      }));
      if (choice === "contrainte") {
        if (+value < 0 || +value > 100) {
          setError("La valeur doit être comprise entre 0 et 100");
        } else {
          if (
            operator === "=" &&
            checkExistence(selectedChoice, contrainteVal)
          ) {
            setError("Conflict");
          } else {
            setContraintVal([...contrainteVal, ...selectedChoice]);
            setError("");
            setOpValue("");
            setSelectedTitres([]);
          }
        }
      } else {
        if (+value > 100) {
          setError("La valeur doit être inférieure à 100");
        } else if (operator !== "=") {
          setError("Seul l'opérateur '=' est accepté");
        } else {
          setContrainteRelaVal([...contrainteRelaVal, ...selectedChoice]);
          setOpValue("");
          setError("");
          setSelectedTitres([]);
        }
      }
    }
  };

  const handleValider = () => {
    console.log("selectedTitres are", contrainteVal);
  };
  return (
    <AccordionBox title={"Contraintes d'optimisation"} Icon={Tool} isExpanded>
      <Box className="flex justify-between flex-wrap gap-4">
        <Box className="flex">
          <SelectMultipl
            contraintes={selectedTitres}
            handleChangeMultiple={handleChangeMultiple}
            contraintesOptimisation={titres}
          />

          <RadioBtn data={[">=", "<=", "="]} setOperateur={setOperateur} />
        </Box>
        <ContraintesOpValue
          operateur={operateur}
          opValue={opValue}
          setOpValue={setOpValue}
          handleClick={handleClick}
          error={error}
          relative={false}
        />
        <ContraintesOpResult
          contrainteVal={contrainteVal}
          setContraintVal={handleContrainteVal}
          contrainteRelaVal={contrainteRelaVal}
          setContrainteRelaVal={handleContrainteRelaVal}
          relative={false}
        />
      </Box>
      <Box className="block max-w-[400px] mt-4 mx-auto">
        <ValidateButton fullWidth onClick={handleValider} />
      </Box>
    </AccordionBox>
  );
};

export default ContraintesOp;
