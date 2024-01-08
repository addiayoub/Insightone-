import React from "react";
import {
  poidsIntFun,
  reliquatFunc,
  sliderModFun,
} from "../../utils/Markowitz/helpers";

const EditSecteurForm = ({ rows, titre, poids, field, reset }) => {
  const { SECTEUR_ACTIVITE } = rows.find((row) => row.titre === titre);
  const { sum } = calculateSum(rows, SECTEUR_ACTIVITE, field);
  const max = +sum.toFixed(2);
  const sameSecteur = rows.filter(
    (row) => row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE
  );

  const [inputValues, setInputValues] = useState(
    sameSecteur.reduce((acc, item) => {
      acc[item.titre] = +item[field].toFixed(2);
      return acc;
    }, {})
  );
  const oldPoids = sameSecteur.reduce((acc, item) => {
    acc[item.titre] = +item[field].toFixed(2);
    return acc;
  }, {});
  const [isLockedStates, setIsLockedStates] = useState(
    sameSecteur.reduce((acc, item) => {
      acc[item.titre] = false;
      return acc;
    }, {})
  );

  const [isModifiedStates, setIsModifiedStates] = useState(
    sameSecteur.reduce((acc, item) => {
      acc[item.titre] = false;
      return acc;
    }, {})
  );

  const list = combinePoidsAndLockStates(
    oldPoids,
    isLockedStates,
    isModifiedStates
  );
  console.log("list", list);
  const maxSlider =
    max -
    list.reduce((sum, item) => {
      const weight = item.isLocked ? item.poids : 0;
      return sum + weight;
    }, 0);
  console.log(maxSlider, inputValues);
  const newPoids = inputValues;
  const sliderMod = sliderModFun(list, newPoids, maxSlider);
  console.log("sliderMod", sliderMod);
  const poidsInt = poidsIntFun(list, sliderMod);
  console.log("poidsInt", poidsInt);
  const poidsMod = poidsModFun(list, poidsInt);
  console.log("poidsMod", poidsMod);
  const reliquat = reliquatFunc(max, poidsInt);
  console.log("reliquat", reliquat);
  const poidsFinal = poidsFinal(list, poidsInt, poidsMod, reliquat);
  const poidsFinal2 = poids(list, poidsInt, poidsMod, reliquat);
  console.log("poidsFinal", poidsFinal, "poidsFinal2", poidsFinal2);

  const sumPoidsFinal = calculateFinalSum(poidsFinal);
  const validPoidsFinal = sumPoidsFinal === max;
  const handleInputChange = (titre, value) => {
    setIsModifiedStates((prevValues) => ({
      ...prevValues,
      [titre]: true,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      [titre]: value,
    }));
    // setInputValues((prevValues) => {
    //   const updatedValues = { ...prevValues };
    //   poidsFinal.forEach((item) => {
    //     const poidsFinalTitre = Object.keys(item)[0];
    //     const value = item[poidsFinalTitre];
    //     if (poidsFinalTitre !== titre) {
    //       updatedValues[poidsFinalTitre] = +value;
    //     }
    //   });
    //   return updatedValues;
    // });

    console.log("Poids Final", poidsFinal);
  };
  const isButtonDisabled = Object.values(inputValues).some(
    (value) => value > max || value < 0
  );

  const handleLock = (titre) => {
    setIsLockedStates((prevValues) => ({
      ...prevValues,
      [titre]: !prevValues[titre],
    }));
  };

  return (
    <Box
      sx={{
        maxHeight: "460px",
        overflowY: "auto",
      }}
    >
      <Box>
        <Typography variant="h6" mb={3}>
          Modifier poids
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          flexDirection: "column",
          padding: "19px 0 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            mb: 3,
          }}
        >
          <Typography>
            Poids Secteur <strong>({SECTEUR_ACTIVITE})</strong> :
            <span>
              <Typography
                variant="span"
                sx={{
                  fontWeight: "bold",
                  color: validPoidsFinal
                    ? "var(--text-success)"
                    : "var(--text-warning)",
                }}
              >
                {sumPoidsFinal}
              </Typography>
              /<strong>{max}</strong>
            </span>
          </Typography>
          {sameSecteur.map((item) => {
            return (
              <Box
                key={item.TICKER}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Typography
                  sx={{
                    minWidth: 150,
                  }}
                >
                  {item.titre}
                </Typography>
                <Slider
                  aria-label={`${item.TICKER}-slider`}
                  // value={inputValues[item.titre]}
                  value={poidsFinal[item.titre]}
                  onChange={(e) =>
                    handleInputChange(item.titre, e.target.value)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value.toFixed(2) + " %"}
                  sx={{
                    minWidth: 150,
                    maxWidth: 150,
                    mb: 2,
                  }}
                  disabled={isLockedStates[item.titre]}
                  step={0.1}
                  min={0}
                  max={maxSlider}
                />
                <TextField
                  id={`${item.titre}-poids`}
                  label="Poids (%)"
                  type="number"
                  disabled={isLockedStates[item.titre]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: maxSlider,
                      min: 0,
                    },
                  }}
                  variant="outlined"
                  onChange={(e) =>
                    handleInputChange(item.titre, e.target.value)
                  }
                  // value={inputValues[item.titre]}
                  value={poidsFinal[item.titre]}
                  sx={{ minWidth: 100, maxWidth: 110 }}
                />
                <IconButton onClick={() => handleLock(item.titre)}>
                  {isLockedStates[item.titre] ? (
                    <Lock size={18} color="var(--text-warning)" />
                  ) : (
                    <Unlock size={18} color="var(--text-success)" />
                  )}
                </IconButton>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            alignSelf: "end",
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{
              margin: "0 10px",
            }}
            onClick={reset}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("inputvak", inputValues);

              // reset();
            }}
            disabled={isButtonDisabled || !validPoidsFinal}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default EditSecteurForm;
