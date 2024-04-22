import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndicateursData } from "../../redux/actions/AnalyseChartisteActions";
import { Box, Button, Autocomplete, TextField } from "@mui/material";
import AccordionBox from "../Ui/AccordionBox";
import dayjs from "dayjs";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import DateComponent from "../DateComponent";
import DataTable from "./DataTable";
import GuageCharts from "./GuageCharts";
import {
  columnsBilan,
  columnsCmptRes,
  columnsIndi,
  columnsMoy,
  columnsNews,
} from "./columns";
import PatternsChandeliers from "./PatternsChandeliers";
import { SearchButton } from "../Ui/Buttons";
import { MenuBoard } from "iconsax-react";

const titres = [
  "ARADEI CAPITAL",
  "DISWAY",
  "ALLIANCES",
  "SODEP-Marsa Maroc",
  "IMMORENTE INVEST",
  "IB MAROC.COM",
  "ZELLIDJA S.A",
  "TAQA MOROCCO",
  "SMI",
  "CARTIER SAADA",
  "BMCI",
  "RISMA",
  "SOCIETE DES BOISSONS DU MAROC",
  "S.M MONETIQUE",
  "AFRIQUIA GAZ",
  "SOTHEMA",
  "AUTO HALL",
  "DARI COUSPATE",
  "CTM",
  "MAGHREB OXYGENE",
  "INVOLYS",
  "CDM",
  "STOKVIS NORD AFRIQUE",
  "MICRODATA",
  "SALAFIN",
  "SANLAM MAROC",
  "DELATTRE LEVIVIER MAROC",
  "AFRIC INDUSTRIES SA",
  "LABEL VIE",
  "TGCC S.A",
  "JET CONTRACTORS",
  "AUTO NEJMA",
  "ATTIJARIWAFA BANK",
  "LESIEUR CRISTAL",
  "RES DAR SAADA",
  "MUTANDIS SCA",
  "SAMIR",
  "COSUMAR",
  "AFMA",
  "LYDEC",
  "EQDOM",
  "PROMOPHARM S.A.",
  "RESIDENCES DAR SAADA",
  "TIMAR",
  "DISTY TECHNOLOGIES",
  "FENIE BROSSETTE",
  "DIAC SALAF",
  "MAROC LEASING",
  "ALUMINIUM DU MAROC",
  "REALISATIONS MECANIQUES",
  "LAFARGEHOLCIM MAR",
  "STROC INDUSTRIE",
  "LAFARGEHOLCIM MAROC",
  "OULMES",
  "CIMENTS DU MAROC",
  "AKDITAL",
  "TOTAL MAROC",
  "MINIERE TOUISSIT",
  "BALIMA",
  "HPS",
  "ITISSALAT AL-MAGHRIB",
  "CIH",
  "BANK OF AFRICA",
  "COLORADO",
  "MED PAPER",
  "WAFA ASSURANCE",
  "MANAGEM",
  "REBAB COMPANY",
  "UNIMER",
  "BCP",
  "TOTALENERGIES MARKETING MAROC",
  "DELTA HOLDING",
  "MAGHREBAIL",
  "SONASID",
  "ATLANTASANAD",
  "DOUJA PROM ADDOHA",
  "ENNAKL",
  "M2M Group",
  "AGMA",
  "SNEP",
];

function Index() {
  const { data, loading, error } = useSelector(
    (state) => state.analyseChartiste
  );
  const [date, setDate] = useState(dayjs());
  const [titre, setTitre] = useState("ITISSALAT AL-MAGHRIB");
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(getIndicateursData({ date, titre }))
      .unwrap()
      .then(() => setIsShow(true))
      .catch(() => notyf.error("Server Error"));
  };
  return (
    <Box className="w-full min-h-[400px] relative mt-[30px]">
      <AccordionBox
        detailsClass={"flex items-center flex-wrap gap-2"}
        title={"Choix du titre"}
        isExpanded={true}
        Icon={MenuBoard}
      >
        <DateComponent label={"Date début"} date={date} setDate={setDate} />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={titres}
          onChange={(event, value) => setTitre(value)}
          sx={{ width: 250 }}
          value={titre}
          size="small"
          renderInput={(params) => <TextField {...params} label="Titres" />}
        />
        <SearchButton disabled={loading} onClick={handelClick} />
      </AccordionBox>

      {loading && <MainLoader />}
      {isShow && !loading && (
        <>
          <PatternsChandeliers data={data.patternsChand} />
          <GuageCharts data={data} />
          <DataTable
            title={"Indicateurs techniques"}
            rows={data.indecateurTech}
            columns={columnsIndi}
            resume={data.resume.indecateurTech}
            id={"indicateurs-techniques"}
          />
          <DataTable
            title={"Moyennes Mobiles"}
            rows={data.moyMobileBVC}
            columns={columnsMoy}
            id={"moyennes-mobiles"}
            resume={data.resume.moyMobileBVC}
          />
          {/* <DataTable
            title={"Bilan"}
            rows={data.bilan}
            columns={columnsBilan}
            id={"bilan"}
          />
          <DataTable
            title={"Compte de résultat"}
            rows={data.compteRes}
            columns={columnsCmptRes}
            id={"compte-résultat"}
          /> */}
          <DataTable
            title={"News"}
            rows={data.news}
            columns={columnsNews}
            id={"news"}
          />
        </>
      )}
    </Box>
  );
}

export default Index;
