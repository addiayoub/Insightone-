import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CapitalisationChart from "../charts/CapitalisationChart.jsx";
import Echart from "../charts/Echart.jsx";
import Cards from "./Cards.jsx";
import {
  getCapitalisationData,
  getDashboardData,
  getMarketData,
  getMarketData_2,
  getSecteurs_2,
  getSliderData,
  getStockData,
} from "../../redux/actions/StockActions.js";
import { transformData } from "../../utils/dataTransformation.js";
import Card from "./Card.jsx";
import { useEffect } from "react";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces.js";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import Donut from "../charts/Donut.jsx";
import { ArrowDown, ArrowRight, ArrowUp } from "react-feather";
import P_DU_M from "../../data/PERFORMANCE_DU_MARCHE_PARAM1.json";
import V_PAR_M_P1 from "../../data/VOLUME_PAR_MARCHE_PARAM1.json";
import P_V_MC from "../../data/PRINCIPAUX_VOLUMES_MC_PARAM1";
import COMMENTAIRE from "../../data/COMMENTAIRE_MARCHE_PARAM1.json";
import T_P_E_P1 from "../../data/TITRES_PLUS_ECHANGES_PARAM1.json";
import P_F_H_B_V_P1 from "../../data/PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1.json";
import P_F_V_P1 from "../../data/PLUS_FORTES_VARIATIONS_PARAM1";
import S_S_P1 from "../../data/STATISTIQUES_SOCIETES_PARAM1.json";
import S_S2_P1 from "../../data/STATISTIQUES_SOCIETES_2_PARAM1.json";
import P_C_P1 from "../../data/PRINCIPALES_CONTRIB_PARAM1.json";
import VAR_SECTEURS from "../../data/VAR_SECTEUR_PARAM1.json";
import { Loader2 } from "../loader/Loader.jsx";
import DataTable from "./DataTable.jsx";
import EV from "../../data/EVOLUTION_MASI_PARAM1.json";
import EvolutionMasi from "../charts/EvolutionMasi.jsx";
import VolumeEchange from "../charts/VolumeEchange.jsx";
import DateComp from "./DateComp.jsx";
import VE from "../../data/VOLUME_ECHANGE_PARAM1.json";
import Commentaire from "./Commentaire.jsx";
import MainLoader from "../loaders/MainLoader.jsx";
import DashSlider from "./DashSlider.jsx";
import Seance from "./Seance.jsx";
import AccordionBox from "../AccordionBox.jsx";
import DateComponent from "../DateComponent.jsx";
import { notyf } from "../../utils/notyf.js";
import isTodayOrFuture from "../../utils/isTodayOrFuture.js";

const textColor = (value) => {
  let className = "";
  let arrow = "";
  if (value > 0) {
    className = "text-[var(--text-success)] font-semibold";
    arrow = <ArrowUp size={18} />;
  } else if (value < 0) {
    className = "text-[var(--text-warning)] font-semibold";
    arrow = <ArrowDown size={18} />;
  } else {
    arrow = <ArrowRight size={18} />;
  }
  return (
    <span className={`${className} min-w-[90px] text-right`}>
      {value + "%"} {arrow}
    </span>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  alignItems: "center",
  gap: "0 15px",
};

function Index() {
  const [indice, setIndice] = useState("");
  const { data, loading, error, marketData, sliderData } = useSelector(
    (state) => state.stock
  );
  const [capitalisationData, setCapitalisationData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [dataObject, setDataObject] = useState({
    PERFORMANCE_DU_MARCHE: P_DU_M,
    VOLUME_PAR_MARCHE: V_PAR_M_P1,
    PRINCIPAUX_VOLUMES_MC: P_V_MC,
    TITRES_PLUS_ECHANGES_PARAM1: T_P_E_P1,
    PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1: P_F_H_B_V_P1,
    PRINCIPALES_CONTRIB_PARAM1: P_C_P1,
    STATISTIQUES_SOCIETES: S_S_P1,
    STATISTIQUES_SOCIETES_2: S_S2_P1,
    PLUS_FORTES_VARIATIONS: P_F_V_P1,
    SECTEURS: VAR_SECTEURS,
    COMMENTAIRE: COMMENTAIRE,
    EVOLUTION_MASI: EV,
    VOLUME_ECHANGE: VE,
  });
  const [refresh, setRefresh] = useState(false);
  const handelSearch = () => {
    firstCall();
    setRefresh(!refresh);
    dispatch(getMarketData_2({ date }))
      .unwrap()
      .then((response) => {
        console.log("response getMarketData_2 actions", response);
        setDataObject({
          ...dataObject,
          PERFORMANCE_DU_MARCHE: response.perfMarche,
          VOLUME_PAR_MARCHE: response.volMarche,
          PRINCIPAUX_VOLUMES_MC: response.princVolumeMC,
          TITRES_PLUS_ECHANGES_PARAM1: response.titreEchange,
          PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1:
            response.PlusHaussesBaissesVolume,
          PRINCIPALES_CONTRIB_PARAM1: response.princContrib,
          STATISTIQUES_SOCIETES_2: response.staticSociete2,
          STATISTIQUES_SOCIETES: response.staticSociete,
          PLUS_FORTES_VARIATIONS: response.plusFortesVar,
          SECTEURS: response.perfSecteurs,
          COMMENTAIRE: response.commentaire,
          EVOLUTION_MASI: response.evolMasi,
          VOLUME_ECHANGE: response.volumeEchan,
        });
      })
      .catch(() => notyf.error("Server error"));
  };
  const PERFORMANCE_DU_MARCHE = [
    {
      field: "Indices",
      headerName: "Indices",
      flex: 1,
      renderCell: (params) => <strong>{params.row.Indices}</strong>,
    },
    {
      field: "Valeur",
      headerName: "Valeur",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row?.Valeur?.toFixed(2);
        return (
          <span className="min-w-[90px] text-right">
            {formatNumberWithSpaces(val)}
          </span>
        );
      },
    },
    {
      field: "perf_prec",
      headerName: "Perf Hebdo",
      flex: 0.5,

      renderCell: (params) => {
        const num = params.row.perf_prec * 100;
        const val = num.toFixed(2);
        return textColor(val);
      },
    },
    {
      field: "perf_ytd",
      headerName: "Perf YTD",
      flex: 0.5,
      renderCell: (params) => {
        const num = params.row.perf_ytd * 100;
        const val = num.toFixed(2);
        return textColor(val);
      },
    },
  ];
  const VOLUME_PAR_MARCHE = [
    {
      field: "marche",
      headerName: "Marché",
      flex: 1,
      renderCell: (params) => <strong>{params.row.marche}</strong>,
    },
    {
      field: "Volume",
      headerName: "Volume (MMAD)",
      flex: 1,
      renderCell: (params) => {
        const val = params.row?.Volume / 1e6;
        return formatNumberWithSpaces(val.toFixed(2));
      },
    },
    {
      field: "perf",
      headerName: "Poids",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.perf * 100;
        return val.toFixed(2) + "%";
      },
    },
    {
      field: "vqm",
      headerName: "VQM (MMAD)",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.vqm / 1e6;
        return formatNumberWithSpaces(val.toFixed(2));
      },
    },
  ];
  const PRINCIPAUX_VOLUMES_MC = [
    {
      field: "INSTRUMENT",
      headerName: "Instrument",
      flex: 1,
      renderCell: (params) => <strong>{params.row.INSTRUMENT}</strong>,
    },
    {
      field: "COURS",
      headerName: "Cours",
      flex: 1,
      renderCell: (params) => {
        return (
          <span className="max-w-[90px] min-w-[90px] text-right">
            {params.row?.COURS?.toFixed(2)}
          </span>
        );
      },
    },
    {
      field: "QUANTITE",
      headerName: "Quantité",
      flex: 1,
      renderCell: (params) => {
        return (
          <span className="max-w-[90px] min-w-[90px] text-right">
            {formatNumberWithSpaces(params.row.QUANTITE)}
          </span>
        );
      },
    },
    {
      field: "VOLUME",
      headerName: "Volume",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.VOLUME / 1e6;
        return formatNumberWithSpaces(val.toFixed(2));
      },
    },
    {
      field: "poids",
      headerName: "Poids",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.poids;
        return val.toFixed(2) + "%";
      },
    },
  ];
  const PRINCIPALES_VARIATIONS = [
    {
      field: "LIBELLE",
      headerName: "Libelle",
      flex: 1,
      renderCell: (params) => <strong>{params.row.LIBELLE}</strong>,
    },
    {
      field: "COURS",
      headerName: "Cours",
      flex: 1,
      renderCell: (params) => {
        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {params.row?.COURS?.toFixed(2)}
          </span>
        );
      },
    },
    {
      field: "perf_prec",
      headerName: "Perf (1s) ",
      flex: 1,
      renderCell: (params) => {
        const val = (params.row.perf_prec * 100).toFixed(2);
        return textColor(val);
      },
    },
    {
      field: "contrib_prec",
      headerName: "Contrib (1s) ",
      flex: 1,
      renderCell: (params) => {
        const val = (params.row.contrib_prec * 100).toFixed(3);
        return textColor(val);
      },
    },
    {
      field: "perf_ytd",
      headerName: "Perf (YTD)",
      flex: 1,
      renderCell: (params) => {
        const val = (params.row.perf_ytd * 100).toFixed(2);
        return textColor(val);
      },
    },
    {
      field: "contrib_YTD",
      headerName: "Contrib (YTD)",
      flex: 1,
      renderCell: (params) => {
        const val = (params.row.contrib_YTD * 100).toFixed(2);
        return textColor(val);
      },
    },
  ];
  const TITRES_PLUS_ECHANGES = [
    {
      field: "valeur",
      headerName: "Société",
      flex: 1,
      renderCell: (params) => <strong>{params.row.valeur}</strong>,
    },
    {
      field: "volume",
      headerName: "Volume en (MMAD)",
      flex: 1,
      // align: "center",
      renderCell: (params) => {
        const val = params.row.volume / 1e6;
        return (
          <span className="min-w-[90px] text-right">
            {formatNumberWithSpaces(val.toFixed(2))}
          </span>
        );
      },
    },
    {
      field: "Cours_Cloture",
      headerName: "Dernier cours en (DH)",
      flex: 1,
      renderCell: (params) => {
        return (
          <span className="min-w-[90px] text-right">
            {formatNumberWithSpaces(params.row.Cours_Cloture)}
          </span>
        );
      },
    },
    {
      field: "variation",
      headerName: "Variation Hebdomadaire",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.variation * 100;

        return (
          <span className="min-w-[90px] text-right">
            {textColor(val.toFixed(2))}
          </span>
        );
      },
    },
  ];
  const PLUS_FORTES_HAUSSES_BAISSES_VOLUME = [
    {
      field: "Société",
      headerName: "Société",
      flex: 1,
      sortable: false,
      renderCell: (params) => <strong>{params.row.Société}</strong>,
    },
    {
      field: "Volume_moyen_YTD",
      headerName: "Volume moyen Hebdo YTD (MMAD)",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const val = params.row.Volume_moyen_YTD / 1e6;
        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(val.toFixed(2))}
          </span>
        );
      },
    },
    {
      field: "Volume",
      headerName: "Volume Hebdo (MMAD)",
      flex: 1,
      renderCell: (params) => {
        const val = params.row.Volume / 1e6;

        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(val.toFixed(2))}
          </span>
        );
      },
    },
    {
      field: "variation",
      headerName: "Variation",
      flex: 0.5,
      renderCell: (params) => params.row.variation.toFixed(2),
    },
    {
      field: "perf",
      headerName: "Perf sur 1 semaine (%)",
      flex: 0.8,
      renderCell: (params) => {
        const val = (params.row.perf * 100).toFixed(2);
        return textColor(val);
      },
    },
  ];
  const PLUS_FORTES_VARIATIONS = [
    {
      field: "valeur",
      headerName: "Société",
      flex: 1,
      renderCell: (params) => (
        <strong title={`${params.row.valeur}`}>{params.row.valeur}</strong>
      ),
    },
    {
      field: "Cours_Cloture",
      headerName: "Cours",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(params.row.Cours_Cloture)}
          </span>
        );
      },
    },
    {
      field: "variation",
      headerName: "Variation Hebdo( %)",
      flex: 1,
      renderCell: (params) => {
        const val = (params.row.variation * 100).toFixed(2);
        return textColor(val);
      },
    },
    {
      field: "volume",
      headerName: "Volume (MMAD)",
      flex: 0.5,
      renderCell: (params) => (params.row.volume / 1e6).toFixed(2),
    },
  ];
  const STATISTIQUES_SOCIETES = [
    {
      field: "s",
      headerName: "",
      flex: 1,
      renderCell: (params) => <strong>{params.row.s}</strong>,
    },
    {
      field: "sur_periode",
      headerName: "Sur la semaine",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatNumberWithSpaces(params.row.sur_periode),
    },
    {
      field: "depuis_debut_annee",
      headerName: "Depuis le début d'année",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return params.row.depuis_debut_annee;
      },
    },
  ];
  const STATISTIQUES_SOCIETES_2 = [
    {
      field: "sur_52_semaines",
      headerName: "Sur 52 semaines",
      flex: 1,
      renderCell: (params) => <strong>{params.row.sur_52_semaines}</strong>,
    },
    {
      field: "Nbre_Societes",
      headerName: "Nbre de Sociétés",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => params.row.Nbre_Societes,
    },
  ];
  const SECTEURS = [
    {
      field: "secteur",
      headerName: "Secteur",
      flex: 2,
      renderCell: (params) => <strong>{params.row.secteur}</strong>,
    },
    {
      field: "valeur",
      headerName: "Valeur",
      flex: 0.5,
      renderCell: (params) => {
        const val = params.row.valeur.toFixed(2);
        return (
          <span className="max-w-[90px] min-w-[60px] text-right">
            {formatNumberWithSpaces(val)}
          </span>
        );
      },
    },
    {
      field: "perf_prec",
      headerName: "Variation",
      flex: 0.5,
      renderCell: (params) => (params.row.perf_prec * 100).toFixed(2) + "%",
    },
    {
      field: "perf_ytd",
      headerName: "Performance YTD",
      flex: 0.5,
      renderCell: (params) => {
        const val = (params.row.perf_ytd * 100).toFixed(2);
        return textColor(val);
      },
    },
  ];

  const [stockData, setStockData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [cardData, setCardData] = useState({});
  const [show, setShow] = useState(false);
  const [seanceDate, setSeanceDate] = useState(dayjs().subtract(1, "day"));
  const dispatch = useDispatch();
  const lastItem = (arr) => {
    return arr[arr.length - 1];
  };
  const determineMarketStatus = (variation) => {
    if (variation > 0.5) {
      return "Bullish";
    } else if (variation >= -0.5 && variation <= 0.5) {
      return "Neutral";
    } else {
      return "Bearish";
    }
  };

  const firstCall = () => {
    getSliderDataAction(date);
    dispatch(getCapitalisationData({ date }))
      .unwrap()
      .then(({ data }) => {
        setCapitalisationData(data);
        const formatedData = transformData(data);
        console.log("formatedData", formatedData);
        const capitalisation = formatedData.Capitalisation;
        const VARIATION_LAST_YEAR = formatedData.VARIATION_LAST_YEAR;
        const VOLUME = formatedData.VOLUME;
        const VARIATION = formatedData.VARIATION;
        const cours = formatedData.COURS_CLOTURE;

        setCardData({
          VARIATION_LAST_YEAR: `${lastItem(VARIATION_LAST_YEAR).toFixed(2)}`,
          capitalisation: (lastItem(capitalisation) / 1000000000).toFixed(2),
          VOLUME: (lastItem(VOLUME) / 1000000).toFixed(2),
          VARIATION: lastItem(VARIATION).toFixed(2),
          cours: lastItem(cours).toFixed(2),
        });
        setIsShow(true);
      });
    dispatch(getStockData({ date }))
      .unwrap()
      .then(({ data }) => {
        setStockData(data);
        setShow(true);
      });
  };
  useEffect(() => {
    firstCall();
  }, [refresh]);
  const getSliderDataAction = (date) => {
    const sliderDate = date;
    dispatch(getSliderData({ date: sliderDate }))
      .unwrap()
      .then(({ data }) => {
        const sDate = isTodayOrFuture(date) ? data[0]["Seance"] : date;
        setSeanceDate(sDate);
      });
  };

  return (
    <Box className="w-full min-h-[400px] relative mt-[30px]">
      <AccordionBox
        detailsClass={"flex items-center flex-wrap gap-2"}
        title={"Choix de la période"}
        isExpanded={true}
      >
        <DateComponent label={"Date"} date={date} setDate={setDate} />
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={loading}
          onClick={handelSearch}
        >
          Rechercher
        </Button>
      </AccordionBox>
      {sliderData.data.length > 0 && seanceDate && <Seance date={seanceDate} />}
      <DashSlider data={sliderData.data} />
      {marketData.loading && <MainLoader />}
      {!loading && isShow && (
        <Cards>
          <Card
            cours={cardData.cours}
            title={determineMarketStatus(cardData.VARIATION)}
            value={cardData.VARIATION}
            variation={true}
          />
          <Card
            title={"Performance YTD"}
            value={cardData.VARIATION_LAST_YEAR}
            variation={true}
          />
          <Card title={"Volume"} value={cardData.VOLUME} />
          <Card title={"Capitalisation"} value={cardData.capitalisation} />
        </Cards>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 items-center mt-24">
        {!loading && isShow && (
          <div className="md:col-span-5 lg:col-span-5 xl:col-span-5">
            <CapitalisationChart data={capitalisationData} />
          </div>
        )}

        {!loading && show && (
          <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
            <Echart data={stockData} />
          </div>
        )}
      </div>

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 items-center my-10">
            <div className="md:col-span-5 lg:col-span-5 xl:col-span-5">
              <EvolutionMasi data={stockData} />
            </div>
            <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
              <VolumeEchange chartData={dataObject.VOLUME_ECHANGE} />
            </div>
          </div>
          <DataTable
            title={"Performance du macrhé"}
            columns={PERFORMANCE_DU_MARCHE}
            rows={dataObject.PERFORMANCE_DU_MARCHE}
            rowId={"Indices"}
          />
          <div style={gridStyle}>
            <DataTable
              title={"Volume par marché"}
              columns={VOLUME_PAR_MARCHE}
              rows={dataObject.VOLUME_PAR_MARCHE}
              rowId={"marche"}
            />
            <Donut data={dataObject.VOLUME_PAR_MARCHE} />
          </div>
          <DataTable
            title={"Principaux volumes de marché central"}
            columns={PRINCIPAUX_VOLUMES_MC}
            rows={dataObject.PRINCIPAUX_VOLUMES_MC}
            rowId={"INSTRUMENT"}
          />
          <DataTable
            title={"Principales variations"}
            columns={PRINCIPALES_VARIATIONS}
            rows={dataObject.PRINCIPALES_CONTRIB_PARAM1}
            rowId={"LIBELLE"}
          />
          <DataTable
            title={"Titres les plus échangés sur le marché"}
            columns={TITRES_PLUS_ECHANGES}
            rows={dataObject.TITRES_PLUS_ECHANGES_PARAM1}
            rowId={"valeur"}
          />
          <DataTable
            title={"Les plus fortes Hausses / Baisses du volume"}
            columns={PLUS_FORTES_HAUSSES_BAISSES_VOLUME}
            rows={dataObject.PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1}
            rowId={"Société"}
          />
          <DataTable
            title={"Plus fortes variations hebdomadaires"}
            columns={PLUS_FORTES_VARIATIONS}
            rows={dataObject.PLUS_FORTES_VARIATIONS}
            rowId={"valeur"}
          />
          <div style={gridStyle}>
            <DataTable
              title={"Statistiques sociétés"}
              columns={STATISTIQUES_SOCIETES}
              rows={dataObject.STATISTIQUES_SOCIETES}
              rowId={"s"}
            />
            <DataTable
              columns={STATISTIQUES_SOCIETES_2}
              rows={dataObject.STATISTIQUES_SOCIETES_2}
              rowId={"sur_52_semaines"}
              my={false}
            />
          </div>
          <DataTable
            columns={SECTEURS}
            title={"les secteurs les plus/moins performants"}
            rows={dataObject.SECTEURS}
            rowId={"secteur"}
            pagination={true}
          />
          <Commentaire data={dataObject.COMMENTAIRE} />
        </>
      )}
    </Box>
  );
}

export default Index;
