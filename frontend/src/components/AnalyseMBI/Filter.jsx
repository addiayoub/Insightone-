import React, { useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/AnalyseMBIActions";
import { SearchButton } from "../Ui/Buttons";
import { Box } from "@mui/material";
import TitresComponent from "../TitresComponent";

const Filter = () => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(1, "month"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [bench, setBencn] = useState("MBI CT");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(
      getData({
        dateDebut: "25/02/2024",
        dateFin: "25/03/2024",
        bench,
      })
    );
  };
  return (
    <AccordionBox isExpanded title="Filtre" detailsClass="flex flex-col gap-2">
      <Box className="flex items-center gap-2">
        <DateComponent date={dateDebut} setDate={setDateDebut} />
        <DateComponent date={dateFin} setDate={setDateFin} />
      </Box>
      <TitresComponent
        choice="Indices"
        setSelectedTitres={setBencn}
        selectedTitres={bench}
      />
      <SearchButton onClick={handleSearch} className="w-full max-w-fit" />
    </AccordionBox>
  );
};

export default Filter;
