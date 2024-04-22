import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { getPortefeuilles } from "../../../redux/actions/UserActions";
import SavedPtfs from "../../portefeuilles/UploadPortefuille/SavedPtfs";
import TabsComponent from "../../TabsComponent";
import AccordionBox from "../../Ui/AccordionBox";
import Choice from "../../portefeuilles/Choice";
import {
  setPtfToBacktest,
  setSelectedPtf,
} from "../../../redux/slices/BacktestSlice";
import ConverTable from "../../portefeuilles/UploadPortefuille/ConvertTable";
import PtfFresh from "../../portefeuilles/UploadPortefuille/PtfFresh";
import UploadPortefeuille from "../../portefeuilles/UploadPortefuille/UploadPortefeuille";
import { Wallet } from "iconsax-react";
import { notyf } from "../../../utils/notyf";

const typesRef = {
  all: ["Actions", "OPCVM"],
  OPCVM: ["OPCVM"],
  Actions: ["Actions"],
};

const Upload = ({ setShow, show, ptfsType = "all" }) => {
  const [selectedPtfs, setSelectedPtfs] = useState([]);
  const [type, setType] = useState("Actions");
  const [ptf, setPtf] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortefeuilles({ type: "" }))
      .unwrap()
      .then()
      .catch(() => notyf.error("Error Fetch portefeuilles"));
  }, []);
  const handlePtfToBacktest = (ptfs, ptfName) => {
    if (ptfName) {
      const choosen = ptfs.find((item) => item.name === ptfName);
      console.log("handlePtfToBacktest", ptfName, ptfs, choosen);
      setSelectedPtfs([choosen]);
      dispatch(setPtfToBacktest(choosen));
      dispatch(setSelectedPtf(ptfName));
      setShow(true);
    } else {
      setSelectedPtfs([]);
      setShow(false);
    }
  };
  const handleFreshPtf = (ptfName, ptfType) => {
    const ptf = {
      name: ptfName,
      field: "poids",
      type: ptfType,
      data: [],
      params: {
        dateDebut: null,
        dateFin: null,
      },
    };
    setSelectedPtfs([ptf]);
    dispatch(setPtfToBacktest(ptf));
    dispatch(setSelectedPtf(ptfName));
    setShow(true);
  };
  const tabs = [
    {
      label: "la liste des portefeuilles enregistrés",
      component: SavedPtfs,
      props: {
        selectedPtfs,
        setSelectedPtfs,
        show,
        setShow,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Convert-Table",
      component: ConverTable,
      props: {
        setPtf,
        setType,
        handlePtfToBacktest,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Importer un portefeuille",
      component: UploadPortefeuille,
      props: {
        setPtf,
        setType,
        handlePtfToBacktest,
        ptfsType: typesRef[ptfsType],
      },
    },
    {
      label: "Nouveau PTF",
      component: PtfFresh,
      props: { handleFreshPtf, ptfsType: typesRef[ptfsType] },
    },
  ];
  return (
    <>
      {/* <SavedPtfs
        selectedPtfs={selectedPtfs}
        setSelectedPtfs={setSelectedPtfs}
        setShow={setShow}
      /> */}
      <AccordionBox title={"Choix du portefeuille"} isExpanded Icon={Wallet}>
        <Choice tabs={tabs} />
      </AccordionBox>

      {show && <TabsComponent tabs={selectedPtfs} />}
    </>
  );
};

export default memo(Upload);
