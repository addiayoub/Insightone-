import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { useDispatch } from "react-redux";
import { resetContraints } from "../redux/slices/DataSlice";
import AccordionBox from "./AccordionBox";
import "dayjs/locale/fr";

function Period({ dateDebut, setDateDebut, dateFin, setDateFin, onSearch }) {
  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(resetContraints());
    onSearch();
  };
  return (
    <AccordionBox
      detailsClass={"flex items-center flex-wrap gap-2"}
      title={"choix de la période"}
      isExpanded={true}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date début"
          slotProps={{ textField: { size: "small" } }}
          format="DD/MM/YYYY"
          value={dateDebut}
          onChange={(newValue) => setDateDebut(newValue)}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date fin"
          slotProps={{ textField: { size: "small" } }}
          format="DD/MM/YYYY"
          value={dateFin}
          onChange={(newValue) => setDateFin(newValue)}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handelClick}
      >
        Rechercher
      </Button>
    </AccordionBox>
  );
}

export default Period;
