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
import Portefeuille from "../OPCVM/Portefeuille";
import PortefeuilleMarko from "../Markowitz/Portefeuille";
import ModalComponent from "../Modal";
import EditPortefeuille from "./EditPortefeuille";
import TabsComponent from "../TabsComponent";
import SingleSelect from "../SingleSelect";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../../redux/slices/BacktestSlice";
import { setPortefeuilles } from "../../redux/slices/UserSlice";
import UploadPortefeuille from "./UploadPortefeuille";

const types = ["Actions", "OPCVM"];

const Portefeuilles = () => {
  const {
    portefeuilles: { loading, data },
  } = useSelector((state) => state.user);
  const [selectedPtfs, setSelectedPtfs] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("Actions");
  const [ptf, setPtf] = useState(null);
  const dispatch = useDispatch();
  console.log("New Ptfs", data);
  useEffect(() => {
    dispatch(getPortefeuilles({ type: "" }))
      .unwrap()
      .then()
      .catch(() => notyf.error("Error Fetch portefeuilles"));
  }, []);
  const handleValider = () => {
    setShow(true);
    console.log("selected ptfs", selectedPtfs);
    const choosen = data.find((item) => item.name === ptf);
    console.log("choosen", choosen);
    setSelectedPtfs([choosen]);
    dispatch(setPtfToBacktest(choosen));
    dispatch(setSelectedPtf(ptf));
    console.log("trasn ptfs", transformBacktestData(selectedPtfs));
  };
  const handleDelete = () => {
    dispatch(deletePortefeuilles({ ptfs: selectedPtfs }))
      .unwrap()
      .then(({ message, portefeuilles }) => {
        dispatch(setPortefeuilles(portefeuilles));
        setPtf(null);
        notyf.success(message);
      })
      .catch(() => notyf.error("Error Delete"));
    setSelectedPtfs([]);
    console.log("selected ptfs", selectedPtfs);
  };
  useEffect(() => {
    if (selectedPtfs.length < 1) {
      setShow(false);
    }
  }, [selectedPtfs]);
  useEffect(() => {
    setShow(false);
    if (ptf) {
      const choosen = data.find((item) => item.name === ptf);
      setSelectedPtfs([choosen]);
    } else {
      setSelectedPtfs([]);
    }
  }, [ptf]);
  useEffect(() => setPtf(null), [type]);
  const portefeuilles = data
    .filter((ptf) => ptf.type === type)
    .map((ptf) => ptf.name);
  return (
    <>
      <AccordionBox
        title="la liste des portefeuilles enregistrés"
        isExpanded={true}
        detailsClass="flex flex-wrap gap-3 items-center"
      >
        <SingleSelect
          label={"Type"}
          options={types}
          value={type}
          setValue={setType}
        />
        <SingleSelect
          label={"Portefeuilles"}
          options={portefeuilles}
          value={ptf}
          setValue={setPtf}
        />
        <Button
          variant="contained"
          className="min-w-[115px] flex gap-2 items-center"
          color="primary"
          size="small"
          onClick={handleValider}
          disabled={!ptf}
        >
          Valider <CheckSquare size={18} />
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          className="min-w-[115px] flex gap-2 items-center"
          onClick={handleDelete}
          disabled={selectedPtfs.length < 1}
        >
          Supprimer <Trash size={18} />
        </Button>
        {/* {!loading && (
          <>
            <Table
              rows={data}
              columns={columns}
              withCheckboxes
              showFooter
              setSelectedRows={setSelectedPtfs}
              pageSize={10}
            />
            {selectedPtfs.map(({ data, type, field }) => {
              return type === "OPCVM" ? (
                <Portefeuille data={data} field={field} />
              ) : (
                <PortefeuilleMarko data={data} field={field} />
              );
            })}
          </>
        )} */}

        {/* <Box className="flex gap-3 flex-wrap mt-4 ">
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
        </Box> */}
      </AccordionBox>
      {/* <UploadPortefeuille /> */}
      {show && <TabsComponent tabs={selectedPtfs} />}
      {show && <PortefeuilleBacktest />}
      {loading && <MainLoader />}
    </>
  );
};

export default memo(Portefeuilles);
