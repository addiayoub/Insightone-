import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getTitres } from "../redux/actions/DataActions";
import { filterSelects, generateSelects } from "../utils/generateSelects";
import { Box } from "@mui/material";
import SelectIndices from "./Markowitz/SelectIndices";
import SingleSelect from "./SingleSelect";

const choice = "OPCVM";

const TitresComponent = ({ selectedTitres, setSelectedTitres }) => {
  const [titres, setTitres] = useState({
    Actions: [],
    OPCVM: [],
    Indices: [],
  });
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
        []
      ),
    [titres, selects, selectedClasses, selectedCategories]
  );
  console.log("render titres comp", filteredSelects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTitres())
      .unwrap()
      .then((data) => setTitres(data))
      .catch((e) => notyf.error("error fetch titres"));
  }, []);
  return (
    <>
      {filteredSelects.map((select, index) => {
        return (
          <Box className="flex flex-wrap gap-2 item-center" key={index}>
            {Object.keys(select).map((key) => {
              if (key === "titres") {
                return (
                  <SingleSelect
                    key={`${select[key]["label"]}-${index + 1}`}
                    label={select[key]["label"]}
                    options={select[key]["data"]}
                    value={selectedTitres}
                    setValue={setSelectedTitres}
                  />
                );
              } else {
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
              }
            })}
          </Box>
        );
      })}
    </>
  );
};

export default memo(TitresComponent);
