import React, { useState } from "react";
import dayjs from "dayjs";
import PeriodFilter from "./PeriodFilter";
import { useSelector } from "react-redux";
import MainLoader from "../loaders/MainLoader";
import Indices from "../Markowitz/Indices";
import Data from "./Data";
import Contraintes from "./Contraintes";
import ContraintesOptimisation from "./ContraintesOptimisation";
import GenerationPortefeuille from "./GenerationPortefeuille";
import Univers from "./Univers";

function Index() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const { dataSet, data } = useSelector((state) => state.opcvm);
  const isLoading = data.loading || dataSet.loading;
  const [contraintesOp, setContraintesOp] = useState([]);
  return (
    <>
      {isLoading && <MainLoader />}
      <PeriodFilter
        dateDebut={dateDebut}
        dateFin={dateFin}
        setDateDebut={setDateDebut}
        setDateFin={setDateFin}
      />
      <Indices dateDebut={dateDebut} dateFin={dateFin} />
      {!isLoading && data.data.length > 0 && (
        <>
          <Contraintes />
          <Data data={data} />
          <Univers
            dateDebut={dateDebut}
            dateFin={dateFin}
            setContraintesOp={setContraintesOp}
          />
          <ContraintesOptimisation
            dateDebut={dateDebut}
            contraintesOp={contraintesOp}
          />
          <GenerationPortefeuille />
        </>
      )}
    </>
  );
}

export default Index;
