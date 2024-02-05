import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { resetContraints } from "../redux/slices/DataSlice";
import AccordionBox from "./AccordionBox";
import DateComponent from "./DateComponent";
import { SearchButton } from "./Ui/Buttons";
import { Calendar } from "react-feather";

function Period({ dateDebut, setDateDebut, dateFin, setDateFin, onSearch }) {
  const dispatch = useDispatch();
  const handelClick = useCallback(() => {
    dispatch(resetContraints());
    onSearch();
  }, [onSearch]);
  return (
    <AccordionBox
      detailsClass={"flex items-center flex-wrap gap-2"}
      title={"choix de la période"}
      isExpanded={true}
      Icon={Calendar}
    >
      <DateComponent
        date={dateDebut}
        setDate={setDateDebut}
        label={"Date début"}
      />
      <DateComponent date={dateFin} setDate={setDateFin} label={"Date fin"} />
      <SearchButton onClick={handelClick} />
    </AccordionBox>
  );
}

export default memo(Period);
