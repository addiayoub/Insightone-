import React, { useState, useEffect } from "react";
import SelectIndices from "./Markowitz/SelectIndices";
import { useDispatch } from "react-redux";
import { getIndices } from "../redux/actions/DataActions";
import { Box } from "@mui/material";

const IndicesComponent = ({ selectedIndices, setSelectedIndices }) => {
  const [indices, setIndices] = useState([]);
  const [indicesData, setIndicesData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sCategories, setSCategories] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSCategories, setSeletedSCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedCategories([]);
    setSeletedSCategories([]);
    setSelectedIndices([]);
    const categories = [...new Set(indicesData.map((item) => item.categorie))];
    const sCategories = [
      ...new Set(indicesData.map((item) => item.S_CATEGORIE)),
    ];
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    const filtred = indicesData.filter((item) =>
      selectedClasses.includes(item.classe)
    );
    if (selectedClasses.length > 0) {
      console.log("Filtered", filtred);
      const newCat = [...new Set(filtred.map((item) => item.categorie))];
      const newSCat = [...new Set(filtred.map((item) => item.S_CATEGORIE))];
      const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
      console.log("new Cat", newCat);
      console.log("new Scat", newSCat);
      console.log("newIndices Sc", newIndices);
      setCategories(newCat);
      setSCategories(newSCat);
      setIndices(newIndices);
    } else {
      console.log("selectedClasses else");

      setCategories(categories);
      setSCategories(sCategories);
      setIndices(indices);
    }
  }, [selectedClasses]);

  useEffect(() => {
    setSeletedSCategories([]);
    setSelectedIndices([]);
    const sCategories = [
      ...new Set(indicesData.map((item) => item.S_CATEGORIE)),
    ];
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    let filtred = indicesData;
    if (selectedClasses.length > 0) {
      filtred = filtred.filter((item) => selectedClasses.includes(item.classe));
    }
    if (selectedCategories.length > 0) {
      filtred = filtred.filter((item) =>
        selectedCategories.includes(item.categorie)
      );
      console.log("setSCategories filtred", filtred);
    }
    const newSCat = [...new Set(filtred.map((item) => item.S_CATEGORIE))];
    const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
    console.log("setSCategories newSCa", newSCat);
    console.log("setSCategories newIndices", newIndices);
    setSCategories(newSCat);
    setIndices(newIndices);
  }, [selectedCategories]);

  useEffect(() => {
    let filtred = indicesData.filter((item) =>
      selectedSCategories.includes(item.S_CATEGORIE)
    );
    console.log("filtered sCta", filtred);

    if (selectedClasses.length > 0) {
      filtred = indicesData.filter((item) =>
        selectedClasses.includes(item.classe)
      );
    }
    if (selectedCategories.length > 0) {
      filtred = indicesData.filter((item) =>
        selectedCategories.includes(item.categorie)
      );
    }
    if (selectedSCategories.length > 0) {
      filtred = filtred.filter((item) =>
        selectedSCategories.includes(item.S_CATEGORIE)
      );
    }
    console.log("selectedSCategories", filtred);
    const indices = [...new Set(indicesData.map((item) => item.NOM_INDICE))];
    const newIndices = [...new Set(filtred.map((item) => item.NOM_INDICE))];
    setIndices(newIndices.length > 0 ? newIndices : indices);
  }, [selectedSCategories]);

  useEffect(() => {
    dispatch(getIndices())
      .unwrap()
      .then((successValue) => {
        console.log("indices success", successValue);
        setIndicesData(successValue.data);
        setClasses(successValue.classes);
        setCategories(successValue.categories);
        setSCategories(successValue.sCategories);
        setIndices(successValue.indices);
      })
      .catch((rejectedValue) => {
        console.log("univers", rejectedValue);
        if (rejectedValue.status) {
          dispatch(logout());
        }
        notyf.error("Request Failed");
      });
  }, []);
  return (
    <Box className="flex gap-2 flex-wrap">
      <SelectIndices
        label={"Classes"}
        indices={classes}
        selectedIndices={selectedClasses}
        setSelectedIndices={setSelectedClasses}
      />
      <SelectIndices
        label={"Catégories"}
        indices={categories}
        selectedIndices={selectedCategories}
        setSelectedIndices={setSelectedCategories}
      />
      <SelectIndices
        label={"Sous-catégories"}
        indices={sCategories}
        selectedIndices={selectedSCategories}
        setSelectedIndices={setSeletedSCategories}
      />
      <SelectIndices
        label={"Indices"}
        indices={indices}
        selectedIndices={selectedIndices}
        disableCloseOnSelect={false}
        setSelectedIndices={setSelectedIndices}
      />
    </Box>
  );
};

export default IndicesComponent;
