import React, { memo, useState } from "react";
import AccordionBox from "../../AccordionBox";
import DateComponent from "../../DateComponent";
import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import Contrainte from "../../Contrainte";
import TitresComponent from "../../TitresComponent";
import { useDispatch } from "react-redux";
import { valueAtRiskAction } from "../../../redux/actions/BlackLittermanActions";
import { SearchButton } from "../../Ui/Buttons";
import { notyf } from "../../../utils/notyf";

const Filter = ({ setIsShow }) => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs());
  const [days, setDays] = useState(100);
  const [initInvest, setInitInvest] = useState(1);
  const [mcSims, setMcSims] = useState(50);
  const [selectedTitres, setSelectedTitres] = useState([
    "AFMA",
    "ITISSALAT AL-MAGHRIB",
  ]);
  const dispatch = useDispatch();
  const handleSearch = () => {
    setIsShow(false);
    dispatch(
      valueAtRiskAction({
        dateDebut,
        dateFin,
        days,
        initInvest,
        mcSims,
        titres: selectedTitres,
      })
    )
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => {
        notyf.error("Server Error");
        setIsShow(false);
      });
  };
  const disabled =
    days === "" ||
    initInvest === "" ||
    mcSims === "" ||
    selectedTitres.length < 2;
  return (
    <AccordionBox title="Value at risk" isExpanded>
      <Box className="flex flex-col flex-wrap gap-4">
        <Box className="flex flex-wrap gap-2 items-center">
          <DateComponent
            date={dateDebut}
            setDate={setDateDebut}
            label="Date début"
          />
          <DateComponent date={dateFin} setDate={setDateFin} label="Date fin" />
        </Box>
        <TitresComponent
          choice="Actions"
          {...{ selectedTitres, setSelectedTitres }}
          isMultipl
        />
        <Box>
          <Contrainte label={"Days"} width={150}>
            <TextField
              id="days"
              size="small"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </Contrainte>
          <Contrainte label={"Initial Investment (MMAD)"} width={150}>
            <TextField
              id="days"
              size="small"
              value={initInvest}
              onChange={(e) => setInitInvest(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </Contrainte>
          <Contrainte label={"mc_sims"} width={150}>
            <TextField
              id="days"
              size="small"
              value={mcSims}
              onChange={(e) => setMcSims(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </Contrainte>
        </Box>
        <SearchButton
          onClick={handleSearch}
          className="w-fit"
          disabled={disabled}
        />
      </Box>
    </AccordionBox>
  );
};

export default memo(Filter);
