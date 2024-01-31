import React from "react";
import calculateNominalPoids from "../utils/nominalPoids";

const nominalTitres = [
  "NOMINAL 1 MOIS",
  "NOMINAL 3 MOIS",
  "NOMINAL 6 MOIS",
  "NOMINAL 1 AN",
  "NOMINAL 2 ANS",
  "NOMINAL 3 ANS",
  "NOMINAL 5 ANS",
  "NOMINAL 10 ANS",
  "NOMINAL 15 ANS",
  "NOMINAL 20 ANS",
  "NOMINAL 25 ANS",
  "NOMINAL 30 ANS",
];

const NominalPoids = ({ data }) => {
  const titre = data.filter((item) => nominalTitres.includes(item.name));
  const nominalPoids = calculateNominalPoids(titre);
  return titre.length > 0 && <h3>Nominal: {nominalPoids}</h3>;
};

export default NominalPoids;
