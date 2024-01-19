import React, { useEffect, useMemo, useState } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import {
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  Slider,
} from "@mui/material";
import { Edit, Lock, PieChart, Unlock } from "react-feather";
import ModalComponent from "../Modal";
import RangeSlider from "../SliderCom";
import EditPoidsSecteurForm from "./EditPoids/EditPoidsSecteurForm";
import EditPoidsTitreForm from "./EditPoids/EditPoidsTitreForm";
import Actions from "./EditPoids/Actions";
import { ajuster, calculateSumPoids } from "../../utils/Markowitz/helpers";
import EditPortefeuille from "../EditPortefeuille";
import SavePortefeuille from "../SavePortefeuille";
import ChangeSecteur from "../Test/ChangeSecteurs";
import AddTitre from "../portefeuilles/AddTitre";
import { addTitres } from "../../utils/addTitres";
import { useDispatch, useSelector } from "react-redux";
import { setPtfToBacktest } from "../../redux/slices/BacktestSlice";
import PortefeuilleActions from "../PortefeuilleActions";
import PortefeuillePeriod from "../PortefeuillePeriod";
import DeleteModal from "../DeleteModal";

const calculateSum = (data, secteur, field) => {
  // Filter the data based on the provided Classification
  const filteredData = data.filter((item) => item.SECTEUR_ACTIVITE === secteur);

  // Calculate the sum and count of the specified field values
  const result = filteredData.reduce(
    (accumulator, currentItem) => {
      return {
        sum: accumulator.sum + currentItem[field],
        count: accumulator.count + 1,
      };
    },
    { sum: 0, count: 0 }
  );

  return result;
};

const calculatePoidsSum = (data, field) => {
  const sum = data.reduce((acc, item) => acc + item[field], 0);
  return parseFloat(sum.toFixed(2));
};

const EditPoisForm = ({
  rows,
  poids,
  setPoids,
  reset,
  titre,
  handleUpdate,
  field,
}) => {
  const { SECTEUR_ACTIVITE, [field]: oldPoids } = rows.find(
    (row) => row.titre === titre
  );
  const sameSecteur = rows.filter(
    (row) => row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE && row.titre !== titre
  );
  const { sum } = calculateSum(rows, SECTEUR_ACTIVITE, field);
  const poidsSecteur = sum - oldPoids;
  console.log("poids secteurs", poidsSecteur, poids, poidsSecteur + +poids);
  console.log("Same secteurs", sameSecteur);
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
          height: "250px",
          minWidth: "400px",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              mb: 3,
            }}
          >
            <span>{titre}</span>
            <Slider
              aria-label="poids-slider"
              value={poids}
              onChange={(event, value) => setPoids(value)}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => value + " %"}
              sx={{
                maxWidth: 150,
              }}
              step={0.5}
              min={0}
              max={100}
            />
            <TextField
              id="poids"
              label="Poids (%)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              autoFocus
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              sx={{ maxWidth: 100 }}
            />
          </Box>

          <Box>
            <div>
              Poids secteur:
              <strong>
                {` ${SECTEUR_ACTIVITE}: ${(poidsSecteur + +poids).toFixed(2)}`}
              </strong>
            </div>
            {sameSecteur.map((item) => {
              return (
                <Box key={item.TICKER}>
                  {item.titre} : <strong> {item[field].toFixed(2)}</strong>
                </Box>
              );
            })}
          </Box>
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
              handleUpdate();
              console.log("poids", poids);
              // reset();
            }}
            disabled={!poids || poids > 100 || poids < 0}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
const filterObjectByLock = (dataObject, isLockedObject) => {
  // Filter the keys based on the condition isLocked is false
  const filteredKeys = Object.keys(dataObject).filter(
    (key) => !isLockedObject[key]
  );

  // Create a new object with the filtered keys
  const filteredObject = Object.fromEntries(
    filteredKeys.map((key) => [key, dataObject[key]])
  );

  return filteredObject;
};

const calculateSumExcludingTitle = (
  oldPoids,
  titleToExclude,
  isLockedObject
) => {
  return Object.keys(oldPoids)
    .filter((title) => title !== titleToExclude && !isLockedObject[title])
    .reduce((sum, title) => sum + oldPoids[title], 0);
};

const filterObjectByTitle = (object, titleToExclude) => {
  return Object.fromEntries(
    Object.entries(object).filter(([title]) => title !== titleToExclude)
  );
};

const sumLockedOrNot = (oldPoids, isLockedObject, isLocked = true) => {
  return Object.keys(oldPoids)
    .filter((title) => isLockedObject[title] === isLocked)
    .reduce((sum, title) => sum + oldPoids[title], 0);
};

const combinePoidsAndLockStates = (poidsObj, isLockedObj, isModifiedStates) => {
  const result = [];

  for (const titre in poidsObj) {
    if (poidsObj.hasOwnProperty(titre)) {
      const poids = poidsObj[titre];
      const isLocked = isLockedObj[titre];
      const isModified = isModifiedStates[titre];
      result.push({ titre, poids, isLocked, isModified });
    }
  }

  return result;
};

const sliderModFun = (data, newValues, maxSlider) => {
  return data.map((item) => {
    const { isModified, titre } = item;
    const newValue = isModified
      ? Math.min(maxSlider, newValues[titre])
      : maxSlider;

    return {
      titre,
      value: newValue,
    };
  });
};

const poidsIntFun = (data, sliderMod) => {
  return data.map((item) => {
    const { isLocked, isModified, titre, poids } = item;
    const fromSliderMod = sliderMod.find((item) => item.titre === titre);
    const newValue = isLocked ? poids : isModified ? fromSliderMod.value : 0;

    return {
      titre,
      value: newValue,
    };
  });
};

const poidsModFun = (data, poidsInt) => {
  return data.map((item) => {
    const { isLocked, isModified, titre, poids } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    console.log("fromPoidsInt", isModified, fromPoidsInt, poids);
    // const newValue = fromPoidsInt.value === 0 ? poids : 0;
    const newValue = fromPoidsInt.value === 0 && !isModified ? poids : 0;
    return {
      titre,
      value: newValue,
    };
  });
};

const calculatePoidsIntModSum = (poids) => {
  return poids.reduce((sum, item) => sum + item.value, 0);
};

const reliquatFunc = (secteurPoids, poidsInt) => {
  const sumPoidsInt = calculatePoidsIntModSum(poidsInt);
  const res = secteurPoids - sumPoidsInt;
  return res;
};

const poidsFinalFunc2 = (data, poidsInt, poidsMod, reliquat) => {
  return data.map((item) => {
    const { titre } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    const sumPoidsMod = calculatePoidsIntModSum(poidsMod);
    const newValue =
      fromPoidsMod.value === 0
        ? fromPoidsInt.value
        : (reliquat * fromPoidsMod.value) / sumPoidsMod;

    return {
      [titre]: +newValue.toFixed(2),
    };
  });
};

const poidsFinalFunc = (data, poidsInt, poidsMod, reliquat) => {
  const result = data.reduce((acc, item) => {
    const { titre } = item;
    const fromPoidsInt = poidsInt.find((item) => item.titre === titre);
    const fromPoidsMod = poidsMod.find((item) => item.titre === titre);
    const sumPoidsMod = calculatePoidsIntModSum(poidsMod);
    const newValue =
      fromPoidsMod.value === 0
        ? fromPoidsInt.value
        : (reliquat * fromPoidsMod.value) / sumPoidsMod;

    acc[titre] = +newValue.toFixed(2);
    return acc;
  }, {});

  return result;
};
const updatepoidsFinal = (data, isMax, isMaxTitre) => {
  if (isMax) {
    for (const [titre, value] of Object.entries(data)) {
      data[titre] = titre === isMaxTitre ? value : 0;
    }
  }
};

const calculateFinalSum = (data) => {
  const sum = Object.values(data).reduce((sum, value) => sum + value, 0);
  return +sum.toFixed(2);
};

const isReachMax = (data, maxValue) => {
  for (const [titre, value] of Object.entries(data)) {
    if (value === maxValue) {
      return {
        isMax: true,
        titre: titre,
      };
    }
  }

  return {
    isMax: false,
    titre: null,
  };
};

const EditSecteurForm2 = ({ rows, titre, poids, field, reset }) => {
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
  console.log("poids", oldPoids);
  const maxSlider =
    max -
    list.reduce((sum, item) => {
      const weight = item.isLocked ? item.poids : 0;
      return sum + weight;
    }, 0);
  console.log(maxSlider, "inputValues", inputValues);
  const newPoids = inputValues;
  const sliderMod = sliderModFun(list, newPoids, maxSlider);
  console.log("sliderMod", sliderMod);
  const poidsInt = poidsIntFun(list, sliderMod);
  console.log("poidsInt", poidsInt);
  const poidsMod = poidsModFun(list, poidsInt);
  console.log("poidsMod", poidsMod);
  const reliquat = reliquatFunc(max, poidsInt);
  console.log("reliquat", reliquat);
  let poidsFinal = poidsFinalFunc(list, poidsInt, poidsMod, reliquat);
  const poidsFinal2 = poidsFinalFunc2(list, poidsInt, poidsMod, reliquat);
  console.log("poidsFinal before", poidsFinal);
  const { isMax, titre: isMaxTitre } = isReachMax(poidsFinal, max);
  updatepoidsFinal(poidsFinal, isMax, isMaxTitre);
  const sumPoidsFinal = calculateFinalSum(poidsFinal);
  const validPoidsFinal = sumPoidsFinal === max;
  console.log("updatedPoidsFinal", poidsFinal);
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

    //   if (isMax && isMaxTitre !== titre) {
    //     for (const [titreF, valueF] of Object.entries(poidsFinal)) {
    //       console.log("titre ", titreF, "value ", valueF);
    //       updatedValues[titreF] = valueF;
    //     }
    //   }
    //   updatedValues[titre] = value;
    //   console.log("updatedValues", updatedValues);
    //   return updatedValues;
    // });
    // setInputValues((prevValues) => {
    //   const updatedValues = { ...prevValues };
    //   poidsFinal.forEach((item) => {
    //     const poidsFinalTitre = Object.keys(item)[0];
    //     const value = item[poidsFinalTitre];
    //     if (poidsFinalTitre !== titre) {
    //       updatedValues[poidsFinalTitre] = +value;
    //     }
    //   });
    //console.log(isMax, isMaxTitre)
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
            console.log(
              isMax && isMaxTitre !== item.titre,
              isMax,
              isMaxTitre,
              item.titre
            );
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
                  // value={poidsFinal[item.titre]}
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
                  disabled={
                    isLockedStates[item.titre] ||
                    (isMax && isMaxTitre !== item.titre)
                  }
                  step={0.1}
                  min={0}
                  max={maxSlider}
                />
                <TextField
                  id={`${item.titre}-poids`}
                  label="Poids (%)"
                  type="number"
                  disabled={
                    isLockedStates[item.titre] ||
                    (isMax && isMaxTitre !== item.titre)
                  }
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
                  //  isMax && isMaxTitre !== item.titre? 0:
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
              console.log("pp", poidsFinal);
              console.log("inputVal", inputValues);

              // reset();
            }}
            // disabled={isButtonDisabled || !validPoidsFinal}
            disabled={isButtonDisabled}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const injectSums = (rows, secteurSums) => {
  return rows.map((row) => {
    const secteur = row.SECTEUR_ACTIVITE;
    const sum = secteurSums[secteur] || 0;
    return { ...row, somme: sum };
  });
};

const calculateRowsSum = (data) => {
  return data;
  // return data.reduce((sum, item) => sum + item.somme, 0);
};

const PortefeuilleTable = ({ rows, field, showActions, params }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [poids, setPoids] = useState(null);
  const [newRows, setNewRows] = useState(rows);
  const [newTitre, setNewTitre] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { ptfToBacktest } = useSelector((state) => state.backtest);
  const dispatch = useDispatch();
  console.log(
    "calculatePoidsSum",
    calculatePoidsSum(newRows, field),
    newRows,
    rows
  );
  const secteurSums = useMemo(() => {
    return newRows.reduce((acc, row) => {
      const secteur = row.SECTEUR_ACTIVITE;
      acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
      return acc;
    }, {});
  }, [newRows, field]);
  const reset = () => {
    setOpen(false);
    setPoids(null);
  };
  const update = () => {
    const { SECTEUR_ACTIVITE } = newRows.find((row) => row.titre === newTitre);
    const sameSecteur = newRows
      .filter(
        (row) =>
          row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE && row.titre !== newTitre
      )
      .map((item) => item.titre);
    const { sum } = calculateSum(newRows, SECTEUR_ACTIVITE, field);
    const part = (sum - +poids) / sameSecteur.length;
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (item.titre === newTitre) {
          return { ...item, [field]: +poids, isLocked: true };
        }
        return { ...item };
      })
    );
    reset();
  };
  const handleLock = (titre, isLocked) => {
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (item.titre === titre) {
          return { ...item, isLocked: !isLocked };
        }
        return { ...item };
      })
    );
  };
  const handleAdd = (data, titresToAdd) => {
    const rowsToAdd = addTitres(data, titresToAdd, field, "Actions");
    console.log("rowsToAdd", rowsToAdd);
    setNewRows((prev) => [...prev, ...rowsToAdd]);
    setOpenAdd(false);
  };
  useEffect(() => console.log("newRowshdzhd", newRows), [newRows]);
  const disableSave =
    calculateSumPoids(rows, field) !== calculateSumPoids(newRows, field);
  useEffect(() => {
    setNewRows(rows);
  }, [rows]);
  const handleDelete = (row) => {
    // setNewRows((prevRows) =>
    //   prevRows.filter((item) => item.titre !== row.titre)
    // );
    setRowToDelete(row);
    setOpenDelete(true);
  };
  const handleDeleteConfirmation = (deleteConfirmed) => {
    console.log("Row to dlete", rowToDelete);
    if (deleteConfirmed) {
      setNewRows((prevRows) =>
        prevRows.filter((item) => item.titre !== rowToDelete.titre)
      );
    }

    // Reset the state
    setOpenDelete(false);
    setRowToDelete(null);
  };
  const columns = useMemo(() => {
    const basedColumns = [
      {
        field: "SECTEUR_ACTIVITE",
        headerName: "SECTEUR ACTIVITÉ",
        flex: 1,
        renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
      },
      {
        field: "titre",
        headerName: "Titre",
        flex: 0.5,
        renderCell: (params) => <strong>{params.row.titre}</strong>,
      },
      {
        field: field,
        headerName: "Poids (%)",
        hide: true,
        flex: 0.3,
        renderCell: (params) => {
          const val = params.row?.[field]?.toFixed(2);
          return (
            <span className="font-semibold">
              {" "}
              {formatNumberWithSpaces(val)}
            </span>
          );
        },
      },
      {
        field: "",
        headerName: "Somme",
        flex: 0.2,
        valueGetter: (params) => {
          const secteur = params.row.SECTEUR_ACTIVITE;
          const sum = secteurSums[secteur] || 0;
          return sum.toFixed(2);
        },
        renderCell: (params) => {
          const secteur = params.row.SECTEUR_ACTIVITE;
          const sum = secteurSums[secteur] || 0;
          return (
            <span className="font-semibold">
              {formatNumberWithSpaces(sum.toFixed(2))}
            </span>
          );
        },
      },
    ];
    if (showActions) {
      basedColumns.push({
        field: "actions",
        flex: 0.5,
        headerName: "Actions",
        renderCell: (params) => (
          <Actions
            rows={rows}
            params={params}
            setOpen={setOpen}
            setOpenEdit={setOpenEdit}
            setNewTitre={setNewTitre}
            setPoids={setPoids}
            handleLock={handleLock}
            field={field}
            handleDelete={handleDelete}
          />
        ),
      });
    }
    return basedColumns;
  }, [newRows, field, showActions]);
  useEffect(() => {
    console.log("newRows useEff", newRows);
    const newPtf = {
      ...ptfToBacktest,
      data: newRows,
    };
    dispatch(setPtfToBacktest(newPtf));
  }, [newRows]);
  useEffect(() => {
    console.log("selectedRows marko", selectedRows);
  }, [selectedRows]);
  const tableRows = useMemo(
    () => injectSums(newRows, secteurSums),
    [newRows, secteurSums]
  );
  return (
    <>
      {showActions && (
        <PortefeuilleActions
          oldRows={rows}
          newRows={newRows}
          setNewRows={setNewRows}
          field={field}
          openAddModal={() => setOpenAdd(true)}
          ptfType="Actions"
          oldParams={params}
          isDisabled={disableSave}
          rowsToDelete={selectedRows}
        />
      )}
      <PortefeuillePeriod params={params} />
      <Table
        columns={columns}
        rows={tableRows}
        pageSize={25}
        withCheckboxes={showActions && true}
        setSelectedRows={setSelectedRows}
      />
      <ModalComponent open={open} handleClose={reset}>
        <EditPoidsTitreForm
          poids={poids}
          setPoids={setPoids}
          reset={reset}
          titre={newTitre}
          handleUpdate={update}
          rows={newRows}
          field={field}
        />
      </ModalComponent>
      <ModalComponent open={openEdit} handleClose={() => setOpenEdit(false)}>
        <EditPoidsSecteurForm
          setNewRows={setNewRows}
          titre={newTitre}
          poids={poids}
          reset={() => setOpenEdit(false)}
          rows={newRows}
          field={field}
        />
      </ModalComponent>
      <ModalComponent open={openAdd} handleClose={() => setOpenAdd(false)}>
        <AddTitre
          handleAdd={handleAdd}
          oldRows={newRows}
          reset={() => setOpenAdd(false)}
        />
      </ModalComponent>
      <ModalComponent
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
      >
        <DeleteModal handleDeleteConfirmation={handleDeleteConfirmation} />
      </ModalComponent>
    </>
  );
};

export default PortefeuilleTable;
