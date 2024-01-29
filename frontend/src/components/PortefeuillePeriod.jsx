import React from "react";

const PortefeuillePeriod = ({ params }) => {
  return (
    params?.dateDebut &&
    params?.dateFin && (
      <h3>
        De{" "}
        <span className="underline decoration-primary">{params.dateDebut}</span>{" "}
        À <span className="underline decoration-primary">{params.dateFin}</span>
      </h3>
    )
  );
};

export default PortefeuillePeriod;
