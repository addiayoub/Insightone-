import React from "react";
import Table from "../Table";
import moment from "moment";
import "./News.css";

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

function News({ data }) {
  return (
    <>
      <h3>News</h3>
      <Table
        columns={columns}
        rows={data}
        rowId={"titre"}
        pagination={true}
        shouldHandleCellClick
        showOnClick={true}
        pageSize={50}
      />
    </>
  );
}

export default News;
