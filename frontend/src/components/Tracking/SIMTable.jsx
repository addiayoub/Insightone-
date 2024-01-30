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
  console.log("input transformData", data);
  let result = data
    .filter((item) => item[field] > 0.001)
    .map((item) => {
      const { CATEGORIE } = titresWithReference.find(
        (row) => row.TITRE.toLowerCase() === item.titre.toLowerCase()
      );
      console.log(item);
      return {
        SECTEUR_ACTIVITE: CATEGORIE,
        titre: item.titre,
        [field]: item[field] * 100,
      };
    });
  result.sort((a, b) => b[field] - a[field]);
  console.log("output transformData", result);
  return result;
};

const SIMTable = ({ SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids);
  const transformedData = useMemo(
    () => transformData(df_poids, SIM),
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
  return (
    <div className="mt-8">
      <SavePortefeuille data={transformedData} field={SIM} type="Actions" />
      <Table rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default memo(SIMTable);
