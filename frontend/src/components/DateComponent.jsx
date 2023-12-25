import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/fr";
import React, { memo } from "react";

function DateComponent({ label, date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <DatePicker
        label={label}
        slotProps={{ textField: { size: "small" } }}
        format="DD/MM/YYYY"
        value={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizationProvider>
  );
}

export default memo(DateComponent);
