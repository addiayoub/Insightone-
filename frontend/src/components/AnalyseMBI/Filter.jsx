import React, { useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/AnalyseMBIActions";
import { SearchButton } from "../Ui/Buttons";
import { Box } from "@mui/material";
import TitresComponent from "../TitresComponent";

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(1, "month"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [bench, setBencn] = useState("MBI CT");
  const dispatch = useDispatch();
  const handleSearch = () => {
    setIsShow(false);
    dispatch(
      getData({
        dateDebut: "25/02/2024",
        dateFin: "25/03/2024",
        bench,
      })
    )
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => setIsShow(false));
  };
  return (
    <AccordionBox
      isExpanded
      title="Filtre"
      detailsClass="flex items-center flex-wrap gap-2"
    >
      <DateComponent date={dateDebut} setDate={setDateDebut} />
      <DateComponent date={dateFin} setDate={setDateFin} />
      <TitresComponent
        choice="Indices"
        setSelectedTitres={setBencn}
        selectedTitres={bench}
        filterField="categorie"
        filterValues={["MBI"]}
        showClasses={false}
        showCategories={false}
      />
      <SearchButton onClick={handleSearch} className="w-full max-w-fit" />
    </AccordionBox>
  );
};

export default Filter;
