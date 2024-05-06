import React from "react";

const TauxChange = ({ data }) => {
  return (
    <div className="p-4 w-full max-w-[400px] font-bold border-1 border-solid border-muted rounded-lg">
      <h3>Taux Change</h3>
      <span className="my-1 block">{data.data[0].SEANCE}</span>
      <div className="flex flex-col gap-3 my-2 text-[17px]">
        <div className="rounded-md p-2 flex flex-col gap-4 bg-primary text-white">
          <p>1 Euro</p>
          <p>{data.data[0]["1 EURO"]}</p>
        </div>
        <div className="rounded-md p-2 flex flex-col gap-4 bg-success text-white">
          <p>1 Dollar</p>
          <p>{data.data[0]["1 DOLLAR U.S.A."]}</p>
        </div>
      </div>
      {data?.Source && (
        <span className="text-muted underline hover:text-primary text-sm">
          Source: {data?.Source}
        </span>
      )}
    </div>
  );
};

export default TauxChange;
