import React, { memo, useState } from "react";
import AccordionBox from "../../Ui/AccordionBox";
import DateComponent from "../../DateComponent";
import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import { SearchButton } from "../../Ui/Buttons";
import { useDispatch } from "react-redux";
import { portfolioAllocationAction } from "../../../redux/actions/BlackLittermanActions";
import { notyf } from "../../../utils/notyf";

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs("12/25/2020"));
  const [dateFin, setDateFin] = useState(dayjs("02/02/2024"));
  const [rfr, setRfr] = useState(0.9);
  const dispatch = useDispatch();
  const handleSearch = () => {
    setIsShow(false);
    dispatch(portfolioAllocationAction({ dateDebut, dateFin, rfr }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch((error) => {
        notyf.error(error);
      });
  };
  const disabled = rfr === "";
  return (
    <AccordionBox
      title="Portefeuille allocation"
      isExpanded
      detailsClass="flex flex-col gap-2"
    >
      <Box className="flex flex-wrap gap-2 items-center">
        <DateComponent
          date={dateDebut}
          setDate={setDateDebut}
          label="Date début"
        />
        <DateComponent date={dateFin} setDate={setDateFin} label="Date fin" />
        <TextField
          value={rfr}
          onChange={(e) => setRfr(e.target.value)}
          size="small"
          label="Risk free rate"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
      </Box>
      <SearchButton
        className="w-fit"
        onClick={handleSearch}
        disabled={disabled}
      />
    </AccordionBox>
  );
};

export default memo(Filter);
