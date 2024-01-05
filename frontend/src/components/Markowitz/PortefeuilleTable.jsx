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
const calculateSumExcludingTitle = (oldPoids, titleToExclude) => {
  return Object.keys(oldPoids)
    .filter((title) => title !== titleToExclude)
    .reduce((sum, title) => sum + oldPoids[title], 0);
};

const filterObjectByTitle = (object, titleToExclude) => {
  return Object.fromEntries(
    Object.entries(object).filter(([title]) => title !== titleToExclude)
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

const EditSecteurForm = ({ rows, titre, poids, field, reset }) => {
  const { SECTEUR_ACTIVITE } = rows.find((row) => row.titre === titre);
  const sameSecteur = rows.filter(
    (row) => row.SECTEUR_ACTIVITE === SECTEUR_ACTIVITE
  );
  console.log("same secteurs", sameSecteur);
  console.log("EditSecteurForm rows", rows);
  const { sum } = calculateSum(rows, SECTEUR_ACTIVITE, field);
  const max = +sum.toFixed(2);
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
  useEffect(() => {
    console.log("inputValues", inputValues, isLockedStates),
      console.log("oldPOids", oldPoids);
  }, [inputValues, isLockedStates]);

  const handleInputChange = (titre, value) => {
    const diff = +(+value - oldPoids[titre]).toFixed(2);
    const notLocked = filterObjectByLock(oldPoids, isLockedStates);
    console.log("filterObjectByLock before", notLocked);
    const sumNon = calculateSumExcludingTitle(notLocked, titre);
    console.log("sumNon", sumNon);
    const titreToUpdate = filterObjectByTitle(notLocked, titre);
    console.log("old poids", oldPoids);
    console.log("filterObjectByLock", notLocked);
    console.log("Diff is ", diff, sumNon, titreToUpdate);
    setInputValues((prevValues) => ({
      ...prevValues,
      [titre]: +value,
    }));
    setIsLockedStates((prevValues) => ({
      ...prevValues,
      [titre]: true,
    }));
    setInputValues((prevValues) => {
      const updatedValues = { ...prevValues };

      for (const [titre, value] of Object.entries(titreToUpdate)) {
        const newPoids = +((diff * value) / sumNon - value).toFixed(2);
        updatedValues[titre] = Math.abs(newPoids);
      }

      return updatedValues;
    });
  };
  const isButtonDisabled = Object.values(inputValues).some(
    (value) => value > max || value < 0
  );

  const handleLock = (titre) => {
    // console.log(titre, ![titre]);
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
            Poids Secteur ({SECTEUR_ACTIVITE}): {max}
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
                  value={inputValues[item.titre]}
                  onChange={(e) =>
                    handleInputChange(item.titre, e.target.value)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value + " %"}
                  sx={{
                    minWidth: 150,
                    maxWidth: 150,
                    mb: 2,
                  }}
                  step={0.5}
                  min={0}
                  max={max}
                />
                <TextField
                  id={`${item.titre}-poids`}
                  label="Poids (%)"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: max,
                    },
                  }}
                  variant="outlined"
                  onChange={(e) =>
                    handleInputChange(item.titre, e.target.value)
                  }
                  value={inputValues[item.titre]}
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

const PortefeuilleTable = ({ rows, field, showActions }) => {
  console.log("Marko PortefeuilleTable");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [poids, setPoids] = useState(null);
  const [newRows, setNewRows] = useState(rows);
  const [newTitre, setNewTitre] = useState("");
  console.log("calculatePoidsSum", calculatePoidsSum(newRows, field));
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
    const { SECTEUR_ACTIVITE } = rows.find((row) => row.titre === newTitre);
    const sameSecteur = rows
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
    console.log(`titre ${titre} isLocked: ${isLocked}`);
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (item.titre === titre) {
          return { ...item, isLocked: !isLocked };
        }
        return { ...item };
      })
    );
  };
  useEffect(() => {
    console.log(calculateRowsSum(newRows));
    console.log("New rows", newRows);
    console.log("New rows with injet", injectSums(newRows, secteurSums));
  }, [newRows]);
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
        flex: 0.3,
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
        flex: 0.3,
        headerName: "Actions",
        renderCell: (params) => {
          return (
            <>
              <IconButton
                onClick={() => {
                  const res = calculateSum(
                    rows,
                    params.row.SECTEUR_ACTIVITE,
                    field
                  );
                  setOpen(true);
                  setPoids(params.row[field].toFixed(2));
                  setNewTitre(params.row.titre);
                  console.log(res);
                }}
              >
                <Edit size={18} color="var(--primary-color)" />
              </IconButton>
              <IconButton
                onClick={() => {
                  setPoids(params.row[field].toFixed(2));
                  setOpenEdit(true);
                  setNewTitre(params.row.titre);
                }}
              >
                <PieChart size={18} color="var(--avwap-color)" />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleLock(params.row.titre, params.row.isLocked)
                }
              >
                {params.row.isLocked ? (
                  <Lock size={18} color="var(--text-warning)" />
                ) : (
                  <Unlock size={18} color="var(--text-success)" />
                )}
              </IconButton>
            </>
          );
        },
      });
    }
    return basedColumns;
  }, [newRows, field, showActions]);

  const ajuster = () => {
    const locked = newRows.filter((item) => item.isLocked);
    const reliquat = 100 - calculatePoidsSum(locked, field);
    const unLocked = newRows.filter((item) => !item.isLocked);
    const sumUnlocked = calculatePoidsSum(unLocked, field);
    const unLockedTitres = unLocked.map((item) => item.titre);
    setNewRows((prevData) =>
      prevData.map((item) => {
        if (unLockedTitres.includes(item.titre)) {
          return { ...item, [field]: (item[field] * reliquat) / sumUnlocked };
        }
        return { ...item };
      })
    );
  };
  return (
    <>
      {showActions && (
        <div style={{ textAlign: "right" }}>
          <h4>
            La somme: {calculatePoidsSum(newRows, field)}/
            {calculatePoidsSum(rows, field)}
          </h4>
          <Button variant="contained" onClick={ajuster}>
            Ajuster
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        rows={injectSums(newRows, secteurSums)}
        pageSize={25}
      />
      <ModalComponent open={open} handleClose={reset}>
        <EditPoisForm
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
        <EditSecteurForm
          titre={newTitre}
          poids={poids}
          reset={() => setOpenEdit(false)}
          rows={newRows}
          field={field}
        />
      </ModalComponent>
    </>
  );
};

export default PortefeuilleTable;
