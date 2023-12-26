import React, { useState } from "react";
import AccordionBox from "../AccordionBox";
import RadioBtn from "../Markowitz/RadioBtn";
import { Box, Button } from "@mui/material";
import ContraintesOpValue from "../Markowitz/ContraintesOpValue";
import ContraintesOpResult from "../Markowitz/ContraintesOpResult";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import SelectMultipl from "../SelectMultipl";
import {
  portefeuilleMinimumVariance_,
  portefeuilleRendementMaximale_,
  portefeuilleMarkowitz_,
  contraintesPoids_,
} from "../../redux/actions/OpcvmActions";
import MainLoader from "../loaders/MainLoader";
import TabTest from "./TabTest";
import checkExistence from "../../utils/checkExistence";

function ContraintesOptimisation({ dateDebut, contraintesOp }) {
  const [contraintes, setContraintes] = useState([]);
  const {
    portefeuilleMinimumVariance,
    portefeuilleRendementMaximale,
    portefeuilleMarkowitz,
  } = useSelector((state) => state.opcvm);
  const dispatch = useDispatch();
  const [operateur, setOperateur] = useState(">=");
  const [opValue, setOpValue] = useState("");
  const [contrainteVal, setContraintVal] = useState([]);
  const [contrainteRelaVal, setContrainteRelaVal] = useState([]);
  const [showPoids, setShowPoids] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContrainteVal = (array) => {
    setContraintVal(array);
  };
  const handleContrainteRelaVal = (array) => setContrainteRelaVal(array);
  const [error, setError] = useState("");
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setContraintes(value);
  };
  const handleClick = (choice, operator, value) => {
    if (contraintes.length > 0 && value !== "") {
      const selectedChoice = contraintes.map((indice) => ({
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
            setContraintes([]);
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
          setContraintes([]);
        }
      }
    }
  };
  const components = [
    {
      loading: portefeuilleMinimumVariance.loading,
      data: portefeuilleMinimumVariance.data,
      title: "Portefeuille minimum variance",
      field: "PTF_Min_Var",
    },
    {
      loading: portefeuilleMinimumVariance.loading,
      data: portefeuilleMinimumVariance.poidsEqui,
      title: "Les poids equipondéré",
      field: "PTF_equi_pond",
    },
    {
      loading: portefeuilleRendementMaximale.loading,
      data: portefeuilleRendementMaximale.data,
      title: "Portefeuille Rendement Maximale",
      field: "PTF_Max_Rdt",
    },
    {
      loading: portefeuilleMarkowitz.loading,
      data: portefeuilleMarkowitz.data,
      title: "portefeuille Markowitz",
      field: "PTF_Max_Shp",
    },
  ];
  const handleValider = async () => {
    setShowPoids(false);
    setIsLoading(true);
    try {
      const response = await dispatch(
        contraintesPoids_({
          titres: contraintesOp,
          contraintes: contrainteVal,
        })
      );
      const contraintesErrors = response.payload.errors_df_ab;
      if (contraintesErrors.length < 1) {
        dispatch(portefeuilleMinimumVariance_())
          .then(() => dispatch(portefeuilleRendementMaximale_()))
          .then(() => dispatch(portefeuilleMarkowitz_()))
          .then(() => {
            setIsLoading(false);
            setShowPoids(true);
          });
      } else {
        setIsLoading(false);
        setShowErrors(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AccordionBox title={"Contraintes d'optimisation"}>
        <Box className="flex justify-between flex-wrap gap-4">
          <Box className="flex">
            <SelectMultipl
              contraintes={contraintes}
              handleChangeMultiple={handleChangeMultiple}
              contraintesOptimisation={contraintesOp}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleValider}
          >
            Valider
          </Button>
        </Box>
      </AccordionBox>
      {isLoading && <MainLoader />}
      {showPoids && <TabTest components={components} isOPCVM />}
    </>
  );
}

export default ContraintesOptimisation;
