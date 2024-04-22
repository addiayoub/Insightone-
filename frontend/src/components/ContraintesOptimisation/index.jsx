import React, { useEffect, useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import { Box } from "@mui/material";
import SelectMultipl from "./SelectMultipl";
import { Tool } from "react-feather";
import RadioBtn from "./RadioBtn";
import ContraintesValue from "./ContraintesValue";
import Result from "./Result";
import { v4 as uuidv4 } from "uuid";
import { ValidateButton } from "../Ui/Buttons";
import { useDispatch } from "react-redux";
import { contraintesPoids_ } from "../../redux/actions/OpcvmActions";
import { notyf } from "../../utils/notyf";
import checkExistence from "../../utils/checkExistence";
import { CONTRAINTES_POIDS } from "../../redux/actions/DataActions";
import MainLoader from "../loaders/MainLoader";

const tt = [
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
const filterTitres = (contraintes, resultArr) => {
  return resultArr.filter((obj) => contraintes.includes(obj.indice));
};
const index = ({ titres = tt, type, setShow, dateDebut = "18/02/2024" }) => {
  const [selectedTitres, setSelectedTitres] = useState([]);
  const [operateur, setOperateur] = useState(">=");
  const [opValue, setOpValue] = useState("");
  const [contrainteVal, setContraintVal] = useState([]);
  const [contrainteRelaVal, setContrainteRelaVal] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    setContraintVal(filterTitres(titres, contrainteVal));
    setContrainteRelaVal(filterTitres(titres, contrainteRelaVal));
    if (titres.length < 1) {
      setError(null);
    }
  }, [titres]);
  useEffect(() => {
    setSelectedTitres([]);
  }, [contrainteVal, contrainteRelaVal]);
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
    console.log("contraintes are", contrainteVal);
    setShow(false);
    setLoading(true);
    if (type === "Actions") {
      dispatch(
        CONTRAINTES_POIDS({
          dateDebut,
          titres,
          contraintes: contrainteVal,
          contraintesRe: contrainteRelaVal,
        })
      )
        .unwrap()
        .then((resp) => {
          console.log("resp", resp);
          setShow(true);
        })
        .catch((error) => {
          console.log("contraintes error", error);
          notyf.error("Error 505");
          setShow(false);
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(
        contraintesPoids_({
          titres,
          contraintes: contrainteVal,
        })
      )
        .unwrap()
        .then((resp) => {
          console.log("resp", resp);
          // notyf.success(resp.message);
          setShow(true);
        })
        .catch((error) => {
          console.log("contraintes error", error);
          notyf.error("Error 505");
          setShow(false);
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <AccordionBox title={"Contraintes d'optimisation"} Icon={Tool} isExpanded>
        <Box className="flex justify-between flex-wrap gap-4">
          <Box className="flex">
            <SelectMultipl
              {...{ titres, selectedTitres, handleChangeMultiple }}
            />
            <RadioBtn data={[">=", "<=", "="]} setOperateur={setOperateur} />
          </Box>
          <ContraintesValue
            operateur={operateur}
            opValue={opValue}
            setOpValue={setOpValue}
            handleClick={handleClick}
            error={error}
            relative={type === "Actions"}
          />
          <Result
            contrainteVal={contrainteVal}
            setContraintVal={handleContrainteVal}
            contrainteRelaVal={contrainteRelaVal}
            setContrainteRelaVal={handleContrainteRelaVal}
            relative={type === "Actions"}
          />
        </Box>
        <Box className="block max-w-[400px] mt-4 mx-auto">
          <ValidateButton fullWidth onClick={handleValider} />
        </Box>
      </AccordionBox>
      {loading && <MainLoader />}
    </>
  );
};

export default index;
