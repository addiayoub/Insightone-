import React from "react";
import referenceData from "../data/titresWithReference.json";
import GridContainer, { GridItem } from "./Ui/GridContainer";
import { Flag } from "react-feather";

const CardHeader = ({ children, icon = Flag }) => {
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
      extraCss="border border-solid p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] overflow-y-auto shadow-lg"
      cols={3}
    >
      {children}
    </GridItem>
    // <div className="border border-solid  p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] overflow-y-auto shadow-lg md:col-span-3 lg:col-span-3 xl:col-span-3">
    //   {children}
    // </div>
  );
};

const SelectedTitresCards = ({ selectedTitres }) => {
  const filteredData = referenceData.filter((item) =>
    selectedTitres.includes(item.TITRE)
  );
  const countGroupe = new Set(filteredData.map((item) => item.Groupe)).size;
  const countClasse = new Set(filteredData.map((item) => item.CLASSE)).size;
  const countCategorie = new Set(filteredData.map((item) => item.CATEGORIE))
    .size;
  const countTitres = filteredData.length;
  return (
    <GridContainer extraCss={"gap-4"}>
      <Card>
        <CardHeader icon={Flag}>
          <h3>Groupes</h3>
        </CardHeader>
        <h2>{countGroupe}</h2>
      </Card>
      <Card>
        <CardHeader icon={Flag}>
          <h3>Classes</h3>
        </CardHeader>
        <h2>{countClasse}</h2>
      </Card>
      <Card>
        <CardHeader icon={Flag}>
          <h3>Catégories</h3>
        </CardHeader>
        <h2>{countCategorie}</h2>
      </Card>
      <Card>
        <CardHeader icon={Flag}>
          <h3>Titres</h3>
        </CardHeader>
        <h2>{countTitres}</h2>
      </Card>
    </GridContainer>
  );
};

export default SelectedTitresCards;
