import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CapitalisationChart from "../charts/CapitalisationChart.jsx";
import Echart from "../charts/Echart.jsx";
import Cards from "./Cards.jsx";
import {
  getCapitalisationData,
  getMarketData_2,
  getSliderData,
  getStockData,
} from "../../redux/actions/StockActions.js";
import { transformData } from "../../utils/dataTransformation.js";
import Card from "./Card.jsx";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import Donut from "../charts/Donut.jsx";
import { Calendar } from "react-feather";
import P_DU_M from "../../data/PERFORMANCE_DU_MARCHE_PARAM1.json";
import V_PAR_M_P1 from "../../data/VOLUME_PAR_MARCHE_PARAM1.json";
import P_V_MC from "../../data/PRINCIPAUX_VOLUMES_MC_PARAM1";
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
import VE from "../../data/VOLUME_ECHANGE_PARAM1.json";
import Commentaire from "./Commentaire.jsx";
import MainLoader from "../loaders/MainLoader.jsx";
import DashSlider from "./DashSlider.jsx";
import Seance from "./Seance.jsx";
import AccordionBox from "../AccordionBox.jsx";
import DateComponent from "../DateComponent.jsx";
import { notyf } from "../../utils/notyf.js";
import Clock from "../Clock/Clock.jsx";
import {
  PERFORMANCE_DU_MARCHE,
  VOLUME_PAR_MARCHE,
  PRINCIPAUX_VOLUMES_MC,
  PRINCIPALES_VARIATIONS,
  TITRES_PLUS_ECHANGES,
  PLUS_FORTES_HAUSSES_BAISSES_VOLUME,
  PLUS_FORTES_VARIATIONS,
  STATISTIQUES_SOCIETES,
  STATISTIQUES_SOCIETES_2,
  SECTEURS,
} from "./columns.jsx";
import GridContainer, { GridItem } from "../Ui/GridContainer.jsx";
import Table from "../Table.jsx";
import { columns } from "../PerfGlis/columns.jsx";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  alignItems: "center",
  gap: "0 15px",
};

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

function Index() {
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
    EVOLUTION_MASI: EV,
    VOLUME_ECHANGE: VE,
    perfMASI: [],
    perfSectoriel: [],
  });
  const [refresh, setRefresh] = useState(false);
  const handelSearch = useCallback(() => {
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
          EVOLUTION_MASI: response.evolMasi,
          VOLUME_ECHANGE: response.volumeEchan,
          perfMASI: response.perfMASI,
          perfSectoriel: response.perfSectoriel,
        });
      })
      .catch(() => notyf.error("Server error"));
  }, [dataObject, date]);

  const [stockData, setStockData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [cardData, setCardData] = useState({});
  const [show, setShow] = useState(false);
  const [seanceDate, setSeanceDate] = useState("");
  const dispatch = useDispatch();

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
        setSeanceDate(data[0]["Seance"]);
      });
  };

  return (
    <Box className="w-full min-h-[400px] relative mt-[30px]">
      <AccordionBox
        detailsClass={"flex items-center flex-wrap gap-2"}
        title={"Choix de la période"}
        isExpanded={true}
        Icon={Calendar}
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
      <Clock />
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
      <GridContainer xGap={12} extraCss="items-center mt-24">
        {!loading && isShow && (
          <GridItem cols={5}>
            <CapitalisationChart data={capitalisationData} />
          </GridItem>
        )}

        {!loading && show && (
          <GridItem cols={7}>
            <Echart data={stockData} />
          </GridItem>
        )}
      </GridContainer>

      {!loading && (
        <>
          <GridContainer xGap={12} extraCss="items-center my-10">
            <GridItem cols={5}>
              <EvolutionMasi data={stockData} />
            </GridItem>
            <GridItem cols={7}>
              <VolumeEchange chartData={dataObject.VOLUME_ECHANGE} />
            </GridItem>
          </GridContainer>
          <DataTable
            title={"Performance du macrhé"}
            columns={PERFORMANCE_DU_MARCHE}
            rows={dataObject.PERFORMANCE_DU_MARCHE}
          />
          {dataObject.perfMASI.length > 0 && (
            <DataTable
              title={"Performance MASI"}
              columns={columns}
              rows={dataObject.perfMASI}
            />
          )}
          {dataObject.perfSectoriel.length > 0 && (
            <DataTable
              title={"Performance Sectoriel"}
              columns={columns}
              rows={dataObject.perfSectoriel}
            />
          )}
          <div style={gridStyle}>
            <DataTable
              title={"Volume par marché"}
              columns={VOLUME_PAR_MARCHE}
              rows={dataObject.VOLUME_PAR_MARCHE}
            />
            <Donut data={dataObject.VOLUME_PAR_MARCHE} />
          </div>
          <DataTable
            title={"Principaux volumes de marché central"}
            columns={PRINCIPAUX_VOLUMES_MC}
            rows={dataObject.PRINCIPAUX_VOLUMES_MC}
          />
          <DataTable
            title={"Principales variations"}
            columns={PRINCIPALES_VARIATIONS}
            rows={dataObject.PRINCIPALES_CONTRIB_PARAM1}
          />
          <DataTable
            title={"Titres les plus échangés sur le marché"}
            columns={TITRES_PLUS_ECHANGES}
            rows={dataObject.TITRES_PLUS_ECHANGES_PARAM1}
          />
          <DataTable
            title={"Les plus fortes Hausses / Baisses du volume"}
            columns={PLUS_FORTES_HAUSSES_BAISSES_VOLUME}
            rows={dataObject.PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1}
          />
          <DataTable
            title={"Plus fortes variations hebdomadaires"}
            columns={PLUS_FORTES_VARIATIONS}
            rows={dataObject.PLUS_FORTES_VARIATIONS}
          />
          <div style={gridStyle}>
            <DataTable
              title={"Statistiques sociétés"}
              columns={STATISTIQUES_SOCIETES}
              rows={dataObject.STATISTIQUES_SOCIETES}
            />
            <DataTable
              columns={STATISTIQUES_SOCIETES_2}
              rows={dataObject.STATISTIQUES_SOCIETES_2}
              my={false}
            />
          </div>
          <DataTable
            columns={SECTEURS}
            title={"les secteurs les plus/moins performants"}
            rows={dataObject.SECTEURS}
            pagination={true}
          />
          <Commentaire date={date} />
        </>
      )}
    </Box>
  );
}

export default memo(Index);
