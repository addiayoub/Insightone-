import React, { useState, useEffect, memo } from "react";
import AccordionBox from "../AccordionBox";
import { useDispatch } from "react-redux";
import {
  getData,
  getNoteInformation,
} from "../../redux/actions/CompOpcvmActions";
import TitresComponent from "../TitresComponent";
import CustomButton, { SearchButton } from "../Ui/Buttons";
import { Box } from "@mui/material";
import PdfViewer from "../PdfViewer";
import MainLoader from "../loaders/MainLoader";
import { hostName } from "../../api/config";
import ModalComponent from "../Modal";
import { FileText } from "react-feather";

const Filter = ({ setIsShow }) => {
  const [opcvm, setOpcvm] = useState("RMA EQUITY MARKET");
  const [loading, setLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsShow(false);
    dispatch(getData({ opcvm }))
      .unwrap()
      .then(() => setIsShow(true));
  };
  useEffect(() => {
    console.log("opcvm changed");
    setPdf(null);
    setIsShow(false);
    if (opcvm) {
      setLoading(true);
      dispatch(getNoteInformation({ opcvm }))
        .unwrap()
        .then(({ Code_Ptf, isExists }) => {
          console.log("resp", Code_Ptf, isExists);
          if (isExists) {
            setPdf(`${hostName}/files/${Code_Ptf}.pdf`);
          }
        })
        .catch((error) => {
          setPdf(null);
        })
        .finally(() => setLoading(false));
    }
  }, [opcvm]);
  return (
    <>
      <AccordionBox title="Filter" isExpanded>
        <Box className="flex flex-wrap items-start gap-2">
          <TitresComponent
            selectedTitres={opcvm}
            setSelectedTitres={setOpcvm}
            choice="OPCVM"
          />
          {!loading && pdf && (
            <CustomButton
              className="my-2"
              text="Note d'information"
              icon={<FileText size={18} />}
              onClick={() => setShowPdf(true)}
            />
          )}
        </Box>
        <SearchButton
          className="my-2"
          onClick={handleClick}
          disabled={!opcvm}
        />
      </AccordionBox>
      {loading && <MainLoader />}

      {!loading && pdf && showPdf && (
        <>
          <ModalComponent
            open={showPdf}
            style={{ maxWidth: 800, width: "100%" }}
            handleClose={() => setShowPdf(false)}
            headerText={opcvm}
            withHeader
          >
            <PdfViewer pdfFile={pdf} />
          </ModalComponent>
        </>
      )}
    </>
  );
};

export default memo(Filter);
