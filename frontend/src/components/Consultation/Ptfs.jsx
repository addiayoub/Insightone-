import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortefeuilles } from "../../redux/actions/UserActions";
import MainLoader from "../loaders/MainLoader";
import { Box } from "@mui/material";
import SingleSelect from "../SingleSelect";
import { ValidateButton } from "../Ui/Buttons";
import AccordionBox from "../Ui/AccordionBox";
import { Wallet } from "iconsax-react";
import moment from "moment";
import PortefeuillePeriod from "../PortefeuillePeriod";
import { Save } from "react-feather";
import { cols, getColumns } from "./columns";
import Table from "../Table";
import { countUniqueValues } from "../../utils/caluclations";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import Card from "../Ui/Card";

const Ptfs = () => {
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  console.log("data", data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortefeuilles({ type: "" }));
  }, []);
  return (
    <>
      <AccordionBox
        title="la liste des portefeuilles enregistrés"
        Icon={Save}
        isExpanded
      >
        <Table columns={cols} rows={data} pageSize={10} />
      </AccordionBox>
      {loading && <MainLoader />}
    </>
  );
};

export default memo(Ptfs);
