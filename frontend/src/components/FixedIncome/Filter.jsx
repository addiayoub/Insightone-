import React, { useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { SearchButton } from "../Ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getFixedIncome } from "../../redux/actions/FixedIncomeActions";
import MainLoader from "../loaders/MainLoader";

const Filter = ({ setShow }) => {
  const { loading } = useSelector((state) => state.fixedIncome);
  const [date, setDate] = useState(dayjs("02/09/2024"));
  const dispatch = useDispatch();
  const handleSearch = () => {
    setShow(false);
    dispatch(getFixedIncome({ date }))
      .unwrap()
      .then((resp) => {
        console.log("Resp ", resp);
        setShow(true);
      })
      .catch((error) => console.log("Error ", error));
  };
  return (
    <>
      <AccordionBox
        title="Paramétres"
        isExpanded
        detailsClass="flex gap-2 items-center"
      >
        <DateComponent {...{ date, setDate }} />
        <SearchButton onClick={handleSearch} />
      </AccordionBox>
      {loading && <MainLoader />}
    </>
  );
};

export default Filter;
