import { Box } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataWithContraints,
  filterMarkoAction,
} from "../../redux/actions/DataActions";
import { resetContraints, setParams } from "../../redux/slices/DataSlice";
import AccordionBox from "../Ui/AccordionBox";
import ContraintesOptimisation from "./ContraintesOptimisation";
import Indices from "./Indices";
import Contraintes from "./Contraintes";
import Period from "../Period";
import Table from "../Table";
import GenerationPortefeuilleAleatoire from "./GenerationPortefeuilleAleatoire";
import { calculatePercentage } from "../../utils/calculatePercentage";
import MainLoader from "../loaders/MainLoader";
import NewUnivers from "./NewUnivres";
import { notyf } from "../../utils/notyf";
import { columns } from "./columns";
import { FileText } from "react-feather";

function Markowitz() {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(5, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [error, setError] = useState(false);
  const [showData, setShowData] = useState(false);
  const [contraintesOptimisation, setContraintesOptimisation] = useState([]);
  const { filterMarko } = useSelector((state) => state.rapport);
  const [filteredData, setFilteredData] = useState(filterMarko.data);
  console.log("filteredData rendered");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetContraints());
    dispatch(getDataWithContraints());
  }, []);
  const handelClick = useCallback(() => {
    setError(false);
    setShowData(true);
    dispatch(setParams({ dateDebut, dateFin }));
    dispatch(filterMarkoAction({ dateDebut, dateFin }))
      .unwrap()
      .then()
      .catch(() => {
        notyf.error("Une erreur interne est survenue. Veuillez réessayer.");
      });
  }, [dateDebut, dateFin]);

  return (
    <>
      <Period
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        onSearch={handelClick}
      />
      {showData && (
        <Box className="w-full min-h-[400px] relative mt-[30px]">
          {filterMarko.loading ? (
            <MainLoader />
          ) : (
            <>
              <Indices dateDebut={dateDebut} dateFin={dateFin} />
              <Contraintes />
              <AccordionBox title={"Data"} isExpanded={true} Icon={FileText}>
                <h3 className="text-right">{`${
                  filterMarko.filteredData.length
                }/${filterMarko.data.length} (${calculatePercentage(
                  filterMarko.filteredData.length,
                  filterMarko.data.length
                )}%)`}</h3>
                <Table
                  columns={columns}
                  rows={filterMarko.filteredData}
                  rowId={"LIBELLE"}
                  pageSize={25}
                />
              </AccordionBox>
              <NewUnivers
                dateDebut={dateDebut}
                dateFin={dateFin}
                setContraintesOptimisation={setContraintesOptimisation}
              />
              <ContraintesOptimisation
                contraintesOptimisation={contraintesOptimisation}
                dateDebut={dateDebut}
                dateFin={dateFin}
              />
              <GenerationPortefeuilleAleatoire
                titres={contraintesOptimisation}
                dateDebut={dateDebut}
                dateFin={dateFin}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default memo(Markowitz);
