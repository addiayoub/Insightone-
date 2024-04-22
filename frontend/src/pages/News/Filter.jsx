import React, { useState } from "react";
import AccordionBox from "../../components/Ui/AccordionBox";
import DateComponent from "../../components/DateComponent";
import dayjs from "dayjs";
import { SearchButton } from "../../components/Ui/Buttons";
import { useDispatch } from "react-redux";
import { getNews } from "../../redux/actions/ProfileFinActions";

const Filter = () => {
  const [dateDebut, setDateDebut] = useState(dayjs().subtract(7, "days"));
  const [dateFin, setDateFin] = useState(dayjs());
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(getNews({ dateDebut, dateFin }));
  };
  return (
    <AccordionBox
      isExpanded
      title="Filter"
      detailsClass="flex items-center gap-2 flex-wrap"
    >
      <DateComponent date={dateDebut} setDate={setDateDebut} />
      <DateComponent date={dateFin} setDate={setDateFin} />
      <SearchButton onClick={handleSearch} />
    </AccordionBox>
  );
};

export default Filter;
