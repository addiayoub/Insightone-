import React from "react";

const PortefeuillePeriod = ({ params }) => {
  return (
    params.dateDebut &&
    params.dateFin && (
      <h3>
        De <span className="underline">{params.dateDebut}</span> À{" "}
        <span className="underline">{params.dateFin}</span>
      </h3>
    )
  );
};

export default PortefeuillePeriod;
