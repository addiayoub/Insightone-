import React from "react";

const PortefeuillePeriod = ({ params }) => {
  return (
    params?.dateDebut &&
    params?.dateFin && (
      <h3>
        De{" "}
        <span className="underline decoration-[var(--primary-color)]">
          {params.dateDebut}
        </span>{" "}
        À{" "}
        <span className="underline decoration-[var(--primary-color)]">
          {params.dateFin}
        </span>
      </h3>
    )
  );
};

export default PortefeuillePeriod;
