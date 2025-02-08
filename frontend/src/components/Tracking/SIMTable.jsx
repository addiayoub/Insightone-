import React, { useMemo, memo } from "react";
import titresWithReference from "../../data/titresWithReference.json";
import { simColumns } from "./columns";
import Table from "../Table";
import { useSelector } from "react-redux";
import SavePortefeuille from "../SavePortefeuille";
import {
  calculateEachSecteurSum,
  injectSecteurSum,
} from "../../utils/Markowitz/helpers";

const transformData = (data, field) => {
  // Afficher toutes les références disponibles
  console.log("=== RÉFÉRENCES DISPONIBLES ===");
  console.log("Total références:", titresWithReference.length);
  console.table(titresWithReference.map(ref => ({
    TITRE: ref.TITRE,
    CATEGORIE: ref.CATEGORIE
  })));

  // Afficher tous les titres à vérifier
  console.log("=== TITRES À VÉRIFIER ===");
  console.log("Total titres:", data.length);
  console.table(data.map(item => ({
    titre: item.titre,
    valeur: item[field]
  })));

  // Vérifier si data est valide
  if (!Array.isArray(data)) {
    console.error("Data must be an array");
    return [];
  }

  const titresSansReference = [];
  
  let result = data
    .filter((item) => item[field] > 0.001)
    .map((item) => {
      // Vérifier si le titre existe
      if (!item.titre) {
        console.warn(`Item sans titre trouvé:`, item);
        return null;
      }

      // Chercher la référence
      const reference = titresWithReference.find(
        (row) => row.TITRE?.toLowerCase() === item.titre.toLowerCase()
      );

      // Si on ne trouve pas de référence
      if (!reference) {
        titresSansReference.push({
          titre_input: item.titre,
          valeur: item[field] * 100,
          references_similaires: titresWithReference
            .filter(ref => ref.TITRE?.toLowerCase().includes(item.titre.toLowerCase().substring(0, 3)))
            .map(ref => ref.TITRE)
        });

        return {
          SECTEUR_ACTIVITE: "Non catégorisé",
          titre: item.titre,
          [field]: item[field] * 100,
        };
      }

      return {
        SECTEUR_ACTIVITE: reference.CATEGORIE || "Non catégorisé",
        titre: item.titre,
        [field]: item[field] * 100,
      };
    })
    .filter(Boolean); // Enlever les éléments null

  // Trier les résultats
  result.sort((a, b) => b[field] - a[field]);

  // Afficher les titres sans références et leurs suggestions
  if (titresSansReference.length > 0) {
    console.log("=== TITRES SANS RÉFÉRENCES ===");
    console.table(titresSansReference);
    console.log(`Total titres sans références: ${titresSansReference.length}`);
    // Pour chaque titre sans référence, on affiche des suggestions possibles
    titresSansReference.forEach(item => {
      console.log(`\nPour le titre "${item.titre_input}", références similaires possibles:`, 
        item.references_similaires.length ? item.references_similaires : "Aucune suggestion");
    });
  }

  console.log("Output transformData", result);
  return result;
};

const SIMTable = ({ SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);

  const transformedData = useMemo(
    () => transformData(df_poids || [], SIM),
    [df_poids, SIM]
  );

  const columns = simColumns(SIM);

  const secteurSums = useMemo(
    () => calculateEachSecteurSum(transformedData, SIM),
    [transformedData, SIM]
  );

  const rows = injectSecteurSum(transformedData, secteurSums);

  console.log("calculateEachSecteurSum", secteurSums);
  console.log("rows", rows);

  // Si pas de données, afficher un message
  if (!transformedData.length) {
    return <div>Aucune donnée disponible</div>;
  }

  return (
    <div className="">
      <SavePortefeuille data={transformedData} field={SIM} type="Actions" />
      <Table rows={rows} columns={columns} pageSize={25} />
    </div>
  );
};

export default memo(SIMTable);