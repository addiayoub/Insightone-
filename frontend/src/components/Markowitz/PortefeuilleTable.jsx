import React, { useMemo } from "react";
import Table from "../Table";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const PortefeuilleTable = ({ rows, field }) => {
  console.log("Marko PortefeuilleTable");
  const secteurSums = useMemo(() => {
    return rows.reduce((acc, row) => {
      const secteur = row.SECTEUR_ACTIVITE;
      acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
      return acc;
    }, {});
  }, [rows, field]);
  const columns = useMemo(() => {
    return [
      {
        field: "SECTEUR_ACTIVITE",
        headerName: "SECTEUR ACTIVITÉ",
        flex: 1,
        renderCell: (params) => <strong>{params.row.SECTEUR_ACTIVITE}</strong>,
      },
      {
        field: "titre",
        headerName: "Titre",
        flex: 0.5,
        renderCell: (params) => <strong>{params.row.titre}</strong>,
      },
      {
        field: field,
        headerName: "Poids (%)",
        flex: 0.3,
        renderCell: (params) => {
          const val = params.row?.[field]?.toFixed(2);
          return (
            <span className="font-semibold">
              {" "}
              {formatNumberWithSpaces(val)}
            </span>
          );
        },
      },
      {
        field: "Somme_Secteur",
        headerName: "Somme",
        flex: 0.3,
        renderCell: (params) => {
          const secteur = params.row.SECTEUR_ACTIVITE;
          const sum = secteurSums[secteur] || 0;
          return (
            <span className="font-semibold">
              {formatNumberWithSpaces(sum.toFixed(2))}
            </span>
          );
        },
      },
    ];
  }, [field]);
  return <Table columns={columns} rows={rows} pageSize={25} />;
};

export default PortefeuilleTable;
