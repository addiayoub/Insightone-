import React from "react";
import Table from "../Table";
import { previsionCols } from "./columns";

const Prevision = ({ data }) => {
  return (
    <div>
      <h3>Prévision sur {data[0].days} jours</h3>
      <p className="my-2 font-semibold text-muted">
        En date du{" "}
        <span className="underline text-primary">{data[0].date}</span>
      </p>
      <Table columns={previsionCols} rows={data} />
    </div>
  );
};

export default Prevision;
