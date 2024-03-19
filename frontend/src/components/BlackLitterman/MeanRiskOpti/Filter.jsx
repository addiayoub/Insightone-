import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../../AccordionBox";
import { TextField, Box, Divider } from "@mui/material";
import DateComponent from "../../DateComponent";
import dayjs from "dayjs";
import TitresComponent from "../../TitresComponent";
import { SearchButton } from "../../Ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { meanRiskOptiAction } from "../../../redux/actions/BlackLittermanActions";
import Views from "./Views";
import { getViewPosition } from "../../../utils/getViewPosition";
import ContraintesOptimisation from "../../ContraintesOptimisation/";

const Filter = () => {
  const { ptfToBacktest } = useSelector((state) => state.backtest);

  const [points, setPoints] = useState(50);
  const [rfr, setRfr] = useState(0);
  const [raf, setRaf] = useState(0);
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(2, "year"));
  const [dateFin, setDateFin] = useState(dayjs().subtract(2, "day"));
  const [selectedTitres, setSelectedTitres] = useState([
    "AFMA",
    "ITISSALAT AL-MAGHRIB",
  ]);
  const [views, setViews] = useState([]);
  const [titres, setTitres] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(
      meanRiskOptiAction({
        titres,
        points,
        dateDebut,
        dateFin,
        rfr,
        raf,
        views,
      })
    );
    // dispatch(meanRiskOptiDataSetAction());
    console.log("HandleSearch");
  };
  useEffect(() => {
    console.log("useEffcet ptf", ptfToBacktest);
    const titres = ptfToBacktest?.data?.map((item) => item.titre);
    console.log("Titres", titres);
    setTitres(titres);
  }, [ptfToBacktest]);
  return (
    <>
      <ContraintesOptimisation {...{ titres, setShow }} type="OPCVM" />
      {show && (
        <AccordionBox
          title="Mean Risk Optimization"
          detailsClass="flex flex-wrap flex-col gap-2"
          isExpanded
        >
          <Box className=" flex flex-wrap items-center gap-x-2 gap-y-4">
            <DateComponent
              date={dateDebut}
              setDate={setDateDebut}
              label="Date début"
            />
            <DateComponent
              date={dateFin}
              setDate={setDateFin}
              label="Date fin"
            />
            <TextField
              id="nb-points"
              size="small"
              label="Nb Points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              id="risk-free-rate"
              size="small"
              label="Risk free rate (%)"
              value={rfr}
              onChange={(e) => setRfr(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              id="risk-aversion-factor"
              size="small"
              label="Risk aversion factor"
              value={raf}
              onChange={(e) => setRaf(e.target.value)}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
          </Box>
          <Divider />
          <Views {...{ views, setViews }} />
          <SearchButton
            className="w-fit"
            onClick={handleSearch}
            // disabled={views.length < 1}
          />
        </AccordionBox>
      )}
    </>
  );
};

export default memo(Filter);
