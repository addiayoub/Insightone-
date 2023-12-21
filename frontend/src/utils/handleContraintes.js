import checkExistence from "./checkExistence";
import { v4 as uuidv4 } from "uuid";

const handleContraintes = (
  choice,
  operator,
  value,
  contraintes,
  setUserChoices,
  setError,
  contrainteVal,
  setContraintVal,
  contrainteRelaVal,
  setContrainteRelaVal,
  setContraintes
) => {
  if (contraintes.length > 0 && value !== "") {
    const selectedChoice = contraintes.map((indice) => ({
      id: uuidv4(),
      indice,
      operateur: operator,
      value: +value,
    }));
    setUserChoices((prevState) => [...prevState, ...selectedChoice]);
    if (choice === "contrainte") {
      if (+value < 0 || +value > 100) {
        setError("La valeur doit être comprise entre 0 et 100");
      } else {
        if (operator === "=" && checkExistence(selectedChoice, contrainteVal)) {
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
export default handleContraintes;
