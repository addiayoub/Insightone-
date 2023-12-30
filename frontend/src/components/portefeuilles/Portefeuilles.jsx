import React, { memo, useEffect, useState } from "react";
import AccordionBox from "../AccordionBox";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortefeuilles,
  getPortefeuilles,
} from "../../redux/actions/UserActions";
import MainLoader from "../loaders/MainLoader";
import Table from "../Table";
import { columns } from "./columns";
import { Box, Button } from "@mui/material";
import PortefeuilleBacktest from "./PortefeuilleBacktest";
import { transformBacktestData } from "../../utils/formatBacktestData";
import { CheckSquare, Trash } from "react-feather";
import { notyf } from "../../utils/notyf";

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
  const handleDelete = () => {
    dispatch(deletePortefeuilles({ ptfs: selectedPtfs }))
      .unwrap()
      .then(({ message }) => notyf.success(message))
      .catch(() => notyf.error("Error Delete"));
    setSelectedPtfs([]);
    console.log("selected ptfs", selectedPtfs);
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
              pageSize={10}
            />
          </>
        )}

        <Box className="flex gap-3 flex-wrap mt-4 ">
          <Button
            variant="contained"
            color="error"
            className="min-w-[115px] flex gap-2 items-center"
            onClick={handleDelete}
            disabled={selectedPtfs.length < 1}
          >
            Supprimer <Trash size={18} />
          </Button>
          <Button
            variant="contained"
            className="min-w-[115px] flex gap-2 items-center"
            color="primary"
            onClick={handleValider}
            disabled={selectedPtfs.length < 1}
          >
            Valider <CheckSquare size={18} />
          </Button>
        </Box>
      </AccordionBox>
      {show && <PortefeuilleBacktest backtestData={selectedPtfs} />}
      {loading && <MainLoader />}
    </>
  );
};

export default memo(Portefeuilles);
