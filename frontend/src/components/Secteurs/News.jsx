import React from "react";
import Table from "../Table";
import moment from "moment";
import "./News.css";
import { v4 as uuidv4 } from "uuid";
function News({ data }) {
  console.log("uuid", uuidv4());
  const dataWithIds = data.map((row) => ({ ...row, id: uuidv4() }));
  const columns = [
    {
      field: "seance",
      headerName: "Séance",
      flex: 0.2,
      renderCell: (params) => (
        <strong>{moment(params.row.seance).format("DD/MM/YYYY")}</strong>
      ),
    },
    {
      field: "Nature",
      headerName: "Nature",
      flex: 0.2,
      renderCell: (params) => <strong>{params.row.Nature}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={`${params.row.article ? "titre" : ""}`}>
            {params.row.titre}
          </div>
        );
      },
    },
    {
      field: "source",
      headerName: "Source",
      flex: 0.3,
      renderCell: (params) => params.row.source,
    },
  ];
  return (
    <>
      <h3>News</h3>
      <Table
        columns={columns}
        rows={dataWithIds}
        rowId={"titre"}
        pagination={true}
        shouldHandleCellClick
        showOnClick={true}
      />
    </>
  );
}

export default News;
