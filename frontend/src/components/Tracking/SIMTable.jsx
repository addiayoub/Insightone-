import React, { useMemo, memo } from "react";
import titresWithReference from "../../data/titresWithReference.json";
import { simColumns } from "./columns";
import Table from "../Table";
import { useSelector } from "react-redux";
import SavePortefeuille from "../SavePortefeuille";
import PortefeuilleTable from "../Markowitz/PortefeuilleTable";

const transformData = (data, field) => {
  const result = [];
  data.forEach((item) => {
    const { CATEGORIE } = titresWithReference.find(
      (row) => row.TITRE.toLowerCase() === item.titre.toLowerCase()
    );
    result.push({
      SECTEUR_ACTIVITE: CATEGORIE,
      titre: item.titre,
      [field]: item[field] * 100,
    });
  });
  result
    .filter((item) => item[field] > 0.001)
    .sort((a, b) => b[field] - a[field]);
  return result;
};

const SIMTable = ({ titres, SIM }) => {
  const {
    generationPtfAlea: { df_poids },
  } = useSelector((state) => state.tracking);
  console.log("df_poids", df_poids);
  const rows = useMemo(() => transformData(df_poids, SIM), [df_poids, SIM]);
  // const columns = simColumns(rows, SIM);
  console.log("transData", transformData(df_poids, SIM));
  return (
    <div className="mt-8">
      <SavePortefeuille data={rows} field={SIM} type="Actions" />
      <PortefeuilleTable rows={rows} field={SIM} />
      {/* <Table rows={rows} columns={columns} pageSize={10} /> */}
    </div>
  );
};

export default memo(SIMTable);
