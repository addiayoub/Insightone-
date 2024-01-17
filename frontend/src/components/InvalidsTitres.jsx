import React from "react";

const InvalidsTitres = ({ invalidsTitres }) => {
  console.log("invalidsTitres", invalidsTitres);
  const output = invalidsTitres.map((item) => {
    return (
      <span key={item} className="text-red-600">
        -{item}
      </span>
    );
  });
  console.log("output", output);
  return (
    invalidsTitres.length > 0 && (
      <>
        <h3>Le fichier contient des titres invalides:</h3>
        <div className="flex flex-wrap gap-2">{output}</div>
      </>
    )
  );
};

export default InvalidsTitres;
