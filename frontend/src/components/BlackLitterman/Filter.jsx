import React, { useState } from "react";
import AccordionBox from "../Ui/AccordionBox";
import { TextField, Box, Divider } from "@mui/material";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { SearchButton } from "../Ui/Buttons";
import Views from "./MeanRiskOpti/Views";
const Filter = () => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [rfc, setRfc] = useState("");
  return (
    <AccordionBox
      title="Vue"
      isExpanded
      detailsClass="flex flex-col flex-wrap gap-2"
    >
      <Box className="flex flex-wrap gap-2 items-center">
        <DateComponent date={dateDebut} setDate={setDateDebut} />
        <DateComponent date={dateFin} setDate={setDateFin} />
      </Box>

      {/* <TextField
        value={rfc}
        onChange={(e) => setRfc(e.target.value)}
        size="small"
        label="Risk free rate"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
      /> */}
      <Divider />
      <Views />
      <SearchButton className="w-fit" />
    </AccordionBox>
  );
};

export default Filter;
