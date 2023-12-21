import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalysesData, getIndicateursData } from "../../redux/actions/AnalyseActions";
import Loader, { Loader2 } from "../loader/Loader";
import {
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import AccordionBox from "../AccordionBox";
import dayjs from "dayjs";
import Table from "../Table";
import Gauge from "./Gauge";
import { ArrowRight } from "@mui/icons-material";
import { logout } from "../../redux/slices/AuthSlice";
import resetStates from "../../utils/resetStates";
import { notyf } from "../../utils/notyf";
import MainLoader from "../loaders/MainLoader";
import DateComponent from "../DateComponent";

const textColor = (cellValue) => {
  let className = " ";
  const cell = cellValue.toLowerCase();

  if (cell.includes("achat")) {
    className = "text-[var(--text-success)]";
  } else if (cell.includes("vente")) {
    className = "text-[var(--text-warning)]";
  } else {
    className = "text-[var(--text-muted)]";
  }
  return <span className={`${className} font-semibold`}>{cellValue}</span>;
};

function Index() {
  const { data, loading, error } = useSelector((state) => state.analyse);
  const [columns, setColumns] = useState([]);
  const [columns2, setColumns2] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [titre, setTitre] = useState("ITISSALAT AL-MAGHRIB");
  const [isShow, setIsShow] = useState(false);
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
  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(getIndicateursData())
    dispatch(getAnalysesData({ titre }))
      .unwrap()
      .then(({ indecateurTech, moyMobileBVC, resume }) => {
        console.log({ indecateurTech, moyMobileBVC, resume });
        setColumns([
          {
            field: "Nom",
            headerName: "Nom",
            width: 360,
            flex: 1.5,
            renderCell: (params) => <strong>{params.row.Nom}</strong>,
          },
          {
            field: "Valeur",
            headerName: "Valeur",
            width: 360,
            flex: 1,
            renderCell: (params) => params.row?.Valeur?.toFixed(2),
          },
          {
            field: "Type_position",
            headerName: "Type de position",
            width: 360,
            flex: 1,
            renderCell: (params) => {
              const cellValue = params.row.Type_position;
              return textColor(cellValue);
            },
          },
        ]);
        setColumns2([
          {
            field: "Periode",
            headerName: "Nom",
            flex: 0.5,
            renderCell: (params) => <strong>{params.row.Periode}</strong>,
          },
          {
            field: "Simple",
            headerName: "Simple",
            flex: 1,
            renderCell: (params) => {
              return (
                <div className="flex gap-2.5">
                  <span>{params.row?.Simple?.toFixed(2)}</span>
                  {textColor(params.row.sign_simple)}
                </div>
              );
            },
          },
          {
            field: "Exponentiel",
            headerName: "Exponentiel",
            flex: 1,
            renderCell: (params) => {
              return (
                <div className="flex gap-2.5">
                  <span>{params.row?.Exponentiel?.toFixed(2)}</span>
                  {textColor(params.row.sign_expo)}
                </div>
              );
            },
          },
        ]);
        setIsShow(true);
      })
      .catch((rejectedValue) => {
        // notyf.error(rejectedValue);
      });
  };
  return (
    <Box className="w-full min-h-[400px] relative mt-[30px]">
      <AccordionBox
        detailsClass={"flex items-center flex-wrap gap-2"}
        title={"Choix du titre"}
        isExpanded={true}
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
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={loading}
          onClick={handelClick}
        >
          Rechercher
        </Button>
      </AccordionBox>

      {loading && <MainLoader />}
      {isShow && !loading && (
        <>
          <div className="my-14">
            <Box className="flex items-center justify-center flex-wrap gap-y-10">
              <Box className="">
                <h2 className="text-xl/7 sm:text-3xl/8 font-bold text-[#181C21] !text-sm">
                  <a
                    href="#indicateurs-techniques"
                    data-test="indicateurs-techniques"
                    className="flex gap-3 items-center hover:underline justify-center"
                  >
                    <span className="min-w-fit">Indicateurs Techniques</span>
                  </a>
                </h2>

                <Gauge
                  value={data.resume.indecateurTech.resume.value}
                  title={data.resume.indecateurTech.resume.text}
                />
              </Box>
              <Box className="">
                <h3 className="text-center">Résumé</h3>
                <Gauge
                  value={data.resume.global.value}
                  title={data.resume.global.text}
                />
              </Box>
              <Box className="">
                <h2 className="text-xl/7 sm:text-3xl/8 font-bold text-[#181C21] !text-sm">
                  <a
                    href="#moyennes-mobiles"
                    data-test="moyennes-mobiles"
                    className="flex gap-3 items-center hover:underline justify-center"
                  >
                    <span className="min-w-fit">Moyennes Mobiles</span>
                  </a>
                </h2>
                <Gauge
                  value={data.resume.moyMobileBVC.resume.value}
                  title={data.resume.moyMobileBVC.resume.text}
                />
              </Box>
            </Box>
          </div>

          <Typography
            variant="h4"
            className="font-semibold my-5"
            id="indicateurs-techniques"
          >
            Indicateurs techniques
          </Typography>
          <Box className="m-3 flex items-center gap-x-5 mobileOnly:flex-col mobileOnly:items-start mobileOnly:gap-y-3 flex-wrap">
            <Box component={"div"}>
              <Box component={"span"} className="text-[var(--text-muted)]">
                Résumé:
              </Box>
            </Box>
            <Box component={"div"} className="flex items-center gap-x-3">
              <Box component={"div"}>
                <Box component={"span"}>
                  <Box
                    component={"span"}
                    className="text-[var(--text-muted)] mr-1"
                  >
                    Achat:
                  </Box>
                  <Box component={"span"} className="font-semibold">
                    {data.resume.indecateurTech.Achat}
                  </Box>
                </Box>
              </Box>
              <Box component={"div"}>
                <Box
                  component={"span"}
                  className="text-[var(--text-muted)]  mr-1"
                >
                  Vente:
                </Box>
                <Box component={"span"} className="font-semibold">
                  {data.resume.indecateurTech.Vente}
                </Box>
              </Box>
              <Box component={"div"}>
                <Box
                  component={"span"}
                  className="text-[var(--text-muted)] mr-1"
                >
                  Neutre:
                </Box>
                <Box component={"span"} className="font-semibold">
                  {data.resume.indecateurTech.Neutre}
                </Box>
              </Box>
            </Box>
          </Box>
          <Table columns={columns} rows={data.indecateurTech} rowId={"Nom"} />
          <Typography
            variant="h4"
            className="font-semibold my-5"
            id="moyennes-mobiles"
          >
            Moyennes Mobiles
          </Typography>
          <Box className="m-3 flex items-center gap-x-5 mobileOnly:flex-col mobileOnly:items-start mobileOnly:gap-y-3 flex-wrap">
            <Box component={"div"}>
              <Box component={"span"} className="text-[var(--text-muted)]">
                Résumé:
              </Box>
            </Box>
            <Box component={"div"} className="flex items-center gap-x-3">
              <Box component={"div"}>
                <Box component={"span"}>
                  <Box
                    component={"span"}
                    className="text-[var(--text-muted)] mr-1"
                  >
                    Achat:
                  </Box>
                  <Box component={"span"} className="font-semibold">
                    {data.resume.moyMobileBVC.Achat}
                  </Box>
                </Box>
              </Box>
              <Box component={"div"}>
                <Box
                  component={"span"}
                  className="text-[var(--text-muted)]  mr-1"
                >
                  Vente:
                </Box>
                <Box component={"span"} className="font-semibold">
                  {data.resume.moyMobileBVC.Vente}
                </Box>
              </Box>
              <Box component={"div"}>
                <Box
                  component={"span"}
                  className="text-[var(--text-muted)] mr-1"
                >
                  Neutre:
                </Box>
                <Box component={"span"} className="font-semibold">
                  {data.resume.moyMobileBVC.Neutre}
                </Box>
              </Box>
            </Box>
          </Box>
          <Table
            columns={columns2}
            rows={data.moyMobileBVC}
            rowId={"Periode"}
          />
        </>
      )}
    </Box>
  );
}

export default Index;
