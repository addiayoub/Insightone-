import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import DateComponent from "../DateComponent";
import dayjs from "dayjs";
import { Autocomplete, TextField } from "@mui/material";
import SelectIndices from "../Markowitz/SelectIndices";
import { useSelector } from "react-redux";
import Filter from "./Filter";

const EditPortefeuille = () => {
  return (
    <>
      <Filter />
    </>
  );
};

export default memo(EditPortefeuille);
