import { React, memo, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import AccordionBox from "../Ui/AccordionBox";
import ContraintesOpResult from "./ContraintesOpResult";
import ContraintesOpValue from "./ContraintesOpValue";
import RadioBtn from "./RadioBtn";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  CONTRAINTES_POIDS,
  EVOLUTION_B100_PORTEFEUILLE_SIMULE,
  get_poids_masi_all,
  portefeuille_Markowitz,
  portefeuille_Rendement_Maximale,
  portefeuille_minimum_variance,
} from "../../redux/actions/DataActions";
import EvolutionB100 from "../charts/EvolutionB100";
import MainLoader from "../loaders/MainLoader";
import TabTest from "../OPCVM/TabTest";
import checkExistence from "../../utils/checkExistence";
import selectStyle from "../../utils/SelectMultiple";
import { ValidateButton } from "../Ui/Buttons";
import { Tool } from "react-feather";
import { PresentionChart } from "iconsax-react";
import SelectMultipl from "../ContraintesOptimisation/SelectMultipl";

const filterResult = (contraintes, resultArr) => {
  return resultArr.filter((obj) => contraintes.includes(obj.indice));
};

function ContraintesOptimisation({ contraintesOptimisation, dateDebut }) {
  const [personName, setPersonName] = useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  const [operateur, setOperateur] = useState(">=");
  const [opValue, setOpValue] = useState("");
  const [contrainteVal, setContraintVal] = useState([]);
  const [contrainteRelaVal, setContrainteRelaVal] = useState([]);
  const [error, setError] = useState(null);
  const [showPoids, setShowPoids] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    portefeuilleMinimumVariance: { data, loading, poidsEqui },
    evolutionB100,
    portefeuilleRendementMaximale,
    portefeuilleMarkowitz,
    poidsMasi,
    contraintesPoids,
  } = useSelector((state) => state.rapport);
  const components = useMemo(() => {
    return [
      {
        loading,
        data,
        title: "Portefeuille minimum variance",
        field: "PTF_Min_Var",
      },
      {
        loading,
        data: poidsEqui,
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
      {
        loading: poidsMasi.loading,
        data: poidsMasi.data,
        title: "Poids MASI",
        field: "Poids_MASI",
      },
    ];
  }, [
    portefeuilleRendementMaximale,
    portefeuilleMarkowitz,
    poidsEqui,
    poidsMasi,
    data,
    loading,
  ]);
  console.log("compon", components);
  const dispatch = useDispatch();
  const handleContrainteVal = (array) => {
    setContraintVal(array);
  };
  const handleContrainteRelaVal = (array) => setContrainteRelaVal(array);
  const handleClick = (choice, operator, value) => {
    if (personName.length > 0 && value !== "") {
      const selectedChoice = personName.map((indice) => ({
        id: uuidv4(),
        indice,
        operateur: operator,
        value: +value,
      }));
      // setUserChoices((prevState) => [...prevState, ...selectedChoice]);
      if (choice === "contrainte") {
        if (+value < 0 || +value > 100) {
          setError("La valeur doit être comprise entre 0 et 100");
        } else {
          console.log("Contrainte Value From click", contrainteVal);
          if (
            operator === "=" &&
            checkExistence(selectedChoice, contrainteVal)
          ) {
            setError("Conflict");
          } else {
            setContraintVal([...contrainteVal, ...selectedChoice]);
            setError("");
            setOpValue("");
            setPersonName([]);
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
          setPersonName([]);
        }
      }
    }
  };
  useEffect(() => {
    setContraintVal(filterResult(contraintesOptimisation, contrainteVal));
    setContrainteRelaVal(
      filterResult(contraintesOptimisation, contrainteRelaVal)
    );
    if (contraintesOptimisation.length < 1) {
      setError(null);
    }
  }, [contraintesOptimisation]);
  const handleValider = async () => {
    setShowPoids(false);
    setIsLoading(true);
    try {
      setShowErrors(false);
      const response = await dispatch(
        CONTRAINTES_POIDS({
          dateDebut,
          titres: contraintesOptimisation,
          contraintes: contrainteVal,
          contraintesRe: contrainteRelaVal,
        })
      );
      const result = response.payload.df_return;
      const contraintesErrors = response.payload.errors_df_ab;
      if (contraintesErrors.length < 1) {
        dispatch(portefeuille_minimum_variance())
          .then(() => dispatch(portefeuille_Rendement_Maximale()))
          .then(() => dispatch(get_poids_masi_all({ dateDebut })))
          .then(() => dispatch(portefeuille_Markowitz()))
          .then(() => dispatch(EVOLUTION_B100_PORTEFEUILLE_SIMULE()))
          .then(() => {
            setIsLoading(false);
            setShowPoids(true);
          })
          .catch(() => setIsLoading(false));
      } else {
        setIsLoading(false);
        setShowErrors(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  // const isLoading =
  //   loading ||
  //   portefeuilleMarkowitz.loading ||
  //   contraintesPoids.loading ||
  //   evolutionB100.loading ||
  //   poidsMasi.loading ||
  //   portefeuilleRendementMaximale.loading;
  const isApiCall =
    loading ||
    contraintesPoids.loading ||
    evolutionB100.loading ||
    portefeuilleMarkowitz.loading ||
    portefeuilleRendementMaximale.loading ||
    poidsMasi.loading;
  return (
    <>
      <AccordionBox title={"Contraintes d'optimisation"} Icon={Tool}>
        <Box className="flex justify-between flex-wrap gap-4">
          <Box className="flex">
            <Box>
              <SelectMultipl
                titres={contraintesOptimisation}
                setSelectedTitres={personName}
                handleChangeMultiple={handleChangeMultiple}
              />
              {showErrors &&
                !contraintesPoids.loading &&
                contraintesPoids.data?.errors_df_ab?.length > 0 && (
                  <div className="max-w-[300px]">
                    {contraintesPoids.data?.errors_df_ab?.map((item, index) => (
                      <p className="text-error my-1" key={index}>
                        - {item.error_message}
                      </p>
                    ))}
                  </div>
                )}
            </Box>

            <RadioBtn data={[">=", "<=", "="]} setOperateur={setOperateur} />
          </Box>
          <ContraintesOpValue
            operateur={operateur}
            opValue={opValue}
            setOpValue={setOpValue}
            handleClick={handleClick}
            error={error}
          />
          <ContraintesOpResult
            contrainteVal={contrainteVal}
            setContraintVal={handleContrainteVal}
            contrainteRelaVal={contrainteRelaVal}
            setContrainteRelaVal={handleContrainteRelaVal}
          />
        </Box>

        <Box className="block max-w-[400px] mt-4 mx-auto">
          <ValidateButton
            fullWidth
            disabled={isApiCall}
            onClick={handleValider}
          />
        </Box>
      </AccordionBox>

      {isLoading && <MainLoader />}
      {/* {!loading && showPoids && data && data.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="mui-tabs">
            <Tab label="Portefeuille minimum variance" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Portefeuille
              data={data["Les poids optimaux"]}
              title={"Portefeuille minimum variance"}
              field={"PTF_Min_Var"}
            />
          </TabPanel>
        </Box>
      )} */}
      {showPoids && <TabTest components={components} />}
      {showPoids && !evolutionB100.loading && evolutionB100.data.length > 0 && (
        <AccordionBox
          title={"Evolution B100 portefeuille simulé"}
          Icon={PresentionChart}
        >
          <EvolutionB100 data={evolutionB100.data} />
        </AccordionBox>
      )}
      {/* {showPoids &&
        components.map((item) => {
          if (!item.loading && item.data.length > 0) {
            return (
              <Portefeuille
                data={item.data}
                title={item.title}
                field={item.field}
              />
            );
          }
        })} */}
    </>
  );
}
export default memo(ContraintesOptimisation);
