import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import { useDispatch, useSelector } from "react-redux";
import { getPortefeuilles } from "../../redux/actions/UserActions";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import { columns } from "./columns";
import { Box, Button } from "@mui/material";
import PortefeuilleBacktest from "./PortefeuilleBacktest";
import { transformBacktestData } from "../../utils/formatBacktestData";

const Portefeuilles = () => {
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  const [selectedPtfs, setSelectedPtfs] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortefeuilles());
  }, []);
  const handleValider = () => {
    setShow(true);
    console.log("selected ptfs", selectedPtfs);
    console.log("trasn ptfs", transformBacktestData(selectedPtfs));
  };
  return (
    <>
      <AccordionBox
        title="la liste des portefeuilles enregistrés"
        isExpanded={true}
      >
        {!loading && (
          <>
            <Table
              rows={data}
              columns={columns}
              withCheckboxes
              showFooter
              setSelectedRows={setSelectedPtfs}
            />
          </>
        )}
        <Box className="block max-w-[400px] mt-4 mx-auto">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleValider}
            disabled={selectedPtfs.length < 1}
          >
            Valider
          </Button>
        </Box>
      </AccordionBox>
      {show && <PortefeuilleBacktest backtestData={selectedPtfs} />}
      {loading && <MainLoader />}
    </>
  );
};

export default memo(Portefeuilles);
