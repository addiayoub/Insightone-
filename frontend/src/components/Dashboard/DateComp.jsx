import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import AccordionBox from "../AccordionBox";

function DateComp({ date, setDate, onSearch, isLoading = false }) {
  const handelClick = () => {
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
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        size="small"
        color="primary"
        disabled={isLoading}
        onClick={handelClick}
      >
        Rechercher
      </Button>
    </AccordionBox>
  );
}

export default DateComp;
