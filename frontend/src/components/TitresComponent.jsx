import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getTitres } from "../redux/actions/DataActions";
import { filterSelects, generateSelects } from "../utils/generateSelects";
import { Box } from "@mui/material";
import SelectIndices from "./Markowitz/SelectIndices";
import SingleSelect from "./SingleSelect";
import { notyf } from "../utils/notyf";

// const choice = "OPCVM";

const TitresComponent = ({
  selectedTitres,
  setSelectedTitres,
  choice,
  isMultipl,
}) => {
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
              const { label, data } = select[key];
              const isSingleSelect = key === "titres" && !isMultipl;
              return isSingleSelect ? (
                <SingleSelect
                  key={`${label}-${index + 1}`}
                  label={label}
                  options={data}
                  value={selectedTitres}
                  setValue={setSelectedTitres}
                />
              ) : (
                <SelectIndices
                  key={`${label}-${index + 1}`}
                  label={label}
                  indices={data}
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
    </>
  );
};

export default memo(TitresComponent);
