import React, { useState, memo, useEffect } from "react";
import AccordionBox from "../Ui/AccordionBox";
import DateComponent from "../DateComponent";
import { Box, Divider, Typography } from "@mui/material";
import TitresComponent from "../TitresComponent";
import SingleSelect from "../SingleSelect";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getAnalyse } from "../../redux/actions/AnalyseOPCVMActions";
import CustomButton, { SearchButton } from "../Ui/Buttons";
import NoteInfo from "./NoteInfo";
import { getNoteInformation } from "../../redux/actions/CompOpcvmActions";
import { hostName } from "../../api/config";
import { FileText } from "react-feather";
import ModalComponent from "../Modal/index";
import PdfViewer from "../PdfViewer";

const seuilOptions = [0.1, 0.2, 0.25, 0.5];
const periodeOptions = ["YTD", "1an", "3ans", "5ans"];

const Filter = ({ setIsShow }) => {
  const [date, setDate] = useState(dayjs());
  const [opcvm, setOpcvm] = useState("RMA EXPANSION");
  const [seuil, setSeuil] = useState(0.5);
  const [periode, setPeriode] = useState("5ans");
  const [pdf, setPdf] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsShow(false);
    dispatch(getAnalyse({ date, opcvm, seuil, periode }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch();
  };
  useEffect(() => {
    setPdf(null);
    if (opcvm) {
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
        .finally();
    }
  }, [opcvm]);
  return (
    <>
      <AccordionBox
        title="paramètres"
        isExpanded
        detailsClass="flex flex-col flex-wrap gap-2"
      >
        <Box className="flex flex-wrap gap-2">
          <DateComponent date={date} setDate={setDate} label="Date" />
        </Box>
        <Divider />
        <Typography className="text-sm">Selection des OPCVM</Typography>
        <Box className="flex gap-2 items-start flex-wrap">
          <TitresComponent
            selectedTitres={opcvm}
            setSelectedTitres={setOpcvm}
            choice="OPCVM"
          />
          {pdf && (
            <CustomButton
              className="my-2"
              text="Note d'information"
              icon={<FileText size={18} />}
              onClick={() => setShowPdf(true)}
            />
          )}
        </Box>
        <Divider />
        <Box className="flex flex-wrap gap-2">
          <SingleSelect
            label="Seuil"
            options={seuilOptions}
            value={seuil}
            setValue={setSeuil}
            suffix="%"
          />
          <SingleSelect
            label="Période"
            options={periodeOptions}
            value={periode}
            setValue={setPeriode}
          />
        </Box>
        <SearchButton onClick={handleClick} className="w-fit" />
      </AccordionBox>
      {pdf && showPdf && (
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
