import React, { memo } from "react";
import calculateNominalPoids from "../utils/nominalPoids";
import { Box } from "@mui/material";

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
  console.log("NominalPoids", data);
  const hasNominalTitre = data.filter((item) =>
    nominalTitres.includes(item.name)
  );
  console.log("has nominal titres", hasNominalTitre);
  const nominalPoids = calculateNominalPoids(hasNominalTitre);
  return (
    hasNominalTitre.length > 0 && (
      <Box
        className="w-fit p-2 text-lg font-medium"
        sx={{
          border: "3px solid var(--primary-color)",
          borderRadius: "5px",
        }}
      >
        Duration: {nominalPoids}
      </Box>
    )
  );
};

export default memo(NominalPoids);
