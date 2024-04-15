import React from "react";
import GridContainer, { GridItem } from "./GridContainer";
import Card from "./Card";

const Cards = ({ cards }) => {
  return (
    <GridContainer>
      {cards.map((card, index) => {
        return (
          <GridItem cols={3} key={index} extraCss="md:col-span-4">
            <Card {...card} />
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default Cards;
