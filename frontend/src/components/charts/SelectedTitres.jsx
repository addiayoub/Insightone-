import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import titresByCategory from "../../data/titresByCategory.json";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import { Box } from "@mui/material";
import { Award } from "react-feather";

const referenceData = [
  ...titresByCategory.Actions,
  ...titresByCategory.Indices,
];

const CardHeader = ({ children, icon = Award }) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className="rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0"
        style={{ border: "1px solid #ccc" }}
      >
        {React.createElement(icon, {
          className: "bx bx-error text-3xl",
          color: "var(--primary-color)",
        })}
      </div>
      {children}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <GridItem
      extraCss="border border-solid  p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] overflow-y-auto shadow-lg"
      cols={4}
    >
      {children}
    </GridItem>
  );
};

const SelectedTitres = ({ selectedTitres }) => {
  const [classCount, setClassCount] = useState(0);
  const [classCategoryCounts, setClassCategoryCounts] = useState({});
  const [categoryTitleCounts, setCategoryTitleCounts] = useState({});

  useEffect(() => {
    // Count the number of unique classes
    const uniqueClasses = new Set();
    selectedTitres.forEach((title) => {
      const data = referenceData.find((item) => item.libelle === title);
      if (data) {
        uniqueClasses.add(data.classe);
      }
    });
    setClassCount(uniqueClasses.size);

    // Count the number of categories for each class
    const classCategories = {};
    selectedTitres.forEach((title) => {
      const data = referenceData.find((item) => item.libelle === title);
      if (data) {
        if (!classCategories[data.classe]) {
          classCategories[data.classe] = new Set();
        }
        classCategories[data.classe].add(data.categorie);
      }
    });
    setClassCategoryCounts(classCategories);

    // Count the number of titles for each category
    const categoryTitles = {};
    selectedTitres.forEach((title) => {
      const data = referenceData.find((item) => item.libelle === title);
      if (data) {
        if (!categoryTitles[data.categorie]) {
          categoryTitles[data.categorie] = 0;
        }
        categoryTitles[data.categorie]++;
      }
    });
    setCategoryTitleCounts(categoryTitles);
  }, [referenceData, selectedTitres]);

  return (
    <GridContainer extraCss={"gap-4"}>
      <Card>
        <CardHeader icon={Award}>
          <h3>Classes</h3>
        </CardHeader>
        <h2>{classCount}</h2>
      </Card>
      <Card>
        <CardHeader>
          <h3>Nombre de catégories par classe</h3>
        </CardHeader>
        {Object.entries(classCategoryCounts).map(([classe, categories]) => (
          <div key={classe} className="flex justify-between items-center mt-2">
            <p className="min-w-[100px] font-medium underline">{classe}</p>
            <p className="font-medium">{categories.size}</p>
          </div>
        ))}
      </Card>
      <Card>
        <CardHeader>
          <h3>Nombre de titres par catégorie</h3>
        </CardHeader>
        {Object.entries(categoryTitleCounts).map(([category, count]) => (
          <div
            key={category}
            className="flex justify-between items-center mt-2"
          >
            <p className="max-w-[150px] font-medium underline">{category}</p>
            <p className="font-medium">{count}</p>
          </div>
        ))}
      </Card>
    </GridContainer>
  );
};

export default SelectedTitres;
