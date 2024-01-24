import React, { useEffect, useMemo, useState } from "react";
import Contrainte from "../Contrainte";
import ToggleButtons from "../ToggleButtons";
import { useDispatch } from "react-redux";
import { getTitres } from "../../redux/actions/DataActions";
import { notyf } from "../../utils/notyf";
import SelectIndices from "../Markowitz/SelectIndices";
import { Box, Button, Typography, Divider } from "@mui/material";
import { filterSelects, generateSelects } from "../../utils/generateSelects";

const buttons = [
  {
    label: "flag_hebdo",
    text: "Choix:",
    values: [
      {
        text: "Actions",
        value: "Actions",
      },
      {
        text: "OPCVM",
        value: "OPCVM",
      },
      {
        text: "Indices",
        value: "Indices",
      },
    ],
  },
];

const AddTitre = ({ handleAdd, oldRows, reset }) => {
  console.log("Old Rows", oldRows);
  const [choice, setChoice] = useState("Actions");
  const [titres, setTitres] = useState({
    Actions: [],
    OPCVM: [],
    Indices: [],
  });
  const excludeTitres = oldRows.map((item) => item.titre);
  console.log("existTitres", excludeTitres);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTitres, setSelectedTitres] = useState([]);
  const onButtonsChange = (label, newValue) => {
    console.log("label ", label, "newValue", newValue);
    setSelectedCategories([]);
    setSelectedClasses([]);
    setSelectedTitres([]);
    setChoice(newValue ?? "Actions");
  };
  const selects = useMemo(
    () => generateSelects(titres, choice),
    [choice, titres]
  );
  const filteredSelects = useMemo(
    () =>
      filterSelects(
        titres,
        choice,
        selects,
        selectedClasses,
        selectedCategories,
        excludeTitres
      ),
    [titres, choice, selects, selectedClasses, selectedCategories]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTitres())
      .unwrap()
      .then((data) => setTitres(data))
      .catch((e) => notyf.error("error fetch titres"));
  }, []);
  useEffect(() => console.log(choice, titres[choice]), [choice]);
  return (
    <Box
      className="flex flex-col gap-5"
      sx={{
        maxHeight: "460px",
        overflowY: "auto",
      }}
    >
      <Box>
        <Typography variant="h6" mb={3}>
          Ajouter nouveau titre
        </Typography>
        <Divider />
      </Box>
      {buttons.map(({ label, text, values }) => {
        return (
          <Contrainte label={text} width={100} key={label}>
            <ToggleButtons
              buttons={values}
              init={choice}
              label={label}
              onButtonsChange={onButtonsChange}
            />
          </Contrainte>
        );
      })}
      {filteredSelects.map((select, index) => {
        return (
          <Box className="flex flex-wrap gap-2 item-center" key={index}>
            {Object.keys(select).map((key) => {
              console.log(
                'select[key]["label"]',
                select[key]["label"],
                Object.keys(select)
              );
              return (
                <SelectIndices
                  key={`${select[key]["label"]}-${index + 1}`}
                  label={select[key]["label"]}
                  indices={select[key]["data"]}
                  selectedIndices={
                    key === "classes"
                      ? selectedClasses
                      : key === "categories"
                      ? selectedCategories
                      : selectedTitres
                  }
                  setSelectedIndices={
                    key === "classes"
                      ? setSelectedClasses
                      : key === "categories"
                      ? setSelectedCategories
                      : setSelectedTitres
                  }
                />
              );
            })}
          </Box>
        );
      })}
      <Box className="self-end">
        <Button
          variant="contained"
          color="error"
          className="mr-[8px]"
          onClick={reset}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleAdd(titres[choice], selectedTitres);
          }}
          disabled={selectedTitres.length < 1}
        >
          Ajouter
        </Button>
      </Box>
    </Box>
  );
};

export default AddTitre;
