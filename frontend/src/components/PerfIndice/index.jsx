import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/actions/PerfIndiActions";
import { isEmptyObject } from "../../utils/getLastItem";
import { Chart, ChartMulti } from "../charts/PerfIndi/";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import MainLoader from "../loaders/MainLoader";
import TauxChange from "./TauxChange";

const boxStyle = "border-1 border-solid border-muted p-2 rounded-lg";

const index = () => {
  const {
    loading,
    data: {
      PIB_VOLUME,
      INFLATION,
      CAMPAGNE_CEREALIERE,
      TAUX_REMPLISSAGE_BARRAGES,
      RECETTES_IDE,
      TRANSFERTS_MRE,
      DEFICIT_COMMERCIAL,
      CONSOMMATION_ELECTRICITE,
      TAUX_DEBITEURS,
      BOURSE_MASI,
      TAUX_CHANGE,
      CHOMAGE_URBAIN,
      RECETTES_TOURISTIQUE,
    },
  } = useSelector((state) => state.perfIndi);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  console.log("CAMPAGNE_CEREALIERE", CAMPAGNE_CEREALIERE);
  return (
    <div>
      {loading && <MainLoader />}
      <GridContainer extraCss="mb-12">
        {!isEmptyObject(PIB_VOLUME) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              xAxis="TRIMESTRE"
              yAxis="PRODUIT_INTERIEUR_BRUT_PIB"
              title="PIB"
              data={PIB_VOLUME}
            />
          </GridItem>
        )}
        {!isEmptyObject(INFLATION) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              xAxis="MOIS_ANNEE"
              yAxis="INFLATION"
              isPerce
              title="Inflation"
              data={INFLATION}
            />
          </GridItem>
        )}
        {!isEmptyObject(CAMPAGNE_CEREALIERE) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              xAxis="ANNEE"
              yAxis="TOTAL_MQx"
              isPerce
              title="Campagne Céréalière"
              data={CAMPAGNE_CEREALIERE}
            />
          </GridItem>
        )}
        {!isEmptyObject(TAUX_REMPLISSAGE_BARRAGES) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              xAxis="date"
              yAxis="TAUX_REMPLISSAGE"
              isPerce
              isArea
              title="Barrages taux de remplissage"
              data={TAUX_REMPLISSAGE_BARRAGES}
            />
          </GridItem>
        )}
      </GridContainer>
      <GridContainer extraCss="mb-12">
        {!isEmptyObject(RECETTES_TOURISTIQUE) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <ChartMulti
              data={RECETTES_TOURISTIQUE}
              xAxis="MOIS"
              title="Recettes touristiques"
            />
          </GridItem>
        )}
        {!isEmptyObject(RECETTES_IDE) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              xAxis="MOIS_ANNEE"
              yAxis="VALEUR"
              title="Recettes IDE"
              data={RECETTES_IDE}
            />
          </GridItem>
        )}
        {!isEmptyObject(TRANSFERTS_MRE) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              data={TRANSFERTS_MRE}
              title="Transferts MRE"
              xAxis="ANNEE"
              yAxis="VALEUR"
            />
          </GridItem>
        )}{" "}
        {!isEmptyObject(DEFICIT_COMMERCIAL) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              data={DEFICIT_COMMERCIAL}
              title="Déficit commercial"
              xAxis="ANNEE"
              yAxis="déficit commercial"
            />
          </GridItem>
        )}
      </GridContainer>
      <GridContainer extraCss="mb-12">
        {!isEmptyObject(CONSOMMATION_ELECTRICITE) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              data={CONSOMMATION_ELECTRICITE}
              xAxis="MOIS_ANNEE"
              yAxis="Energie nette appelée"
              title="Consommation d'électricité"
            />
          </GridItem>
        )}
        {!isEmptyObject(TAUX_DEBITEURS) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              data={TAUX_DEBITEURS}
              xAxis="MOIS_ANNEE"
              yAxis="Taux global"
              title="Taux débiteur global"
              isPerce
            />
          </GridItem>
        )}
        {!isEmptyObject(BOURSE_MASI) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <Chart
              data={BOURSE_MASI}
              xAxis="Seance"
              yAxis="Valeur"
              title="Bourse MASI"
              isArea
            />
          </GridItem>
        )}
        {!isEmptyObject(CHOMAGE_URBAIN) && (
          <GridItem cols={3} extraCss={`${boxStyle}`}>
            <ChartMulti
              data={CHOMAGE_URBAIN}
              xAxis="TRIMESTRE"
              title="Chômage urbain"
              isPerce
            />
          </GridItem>
        )}
      </GridContainer>

      {!isEmptyObject(TAUX_CHANGE) && <TauxChange data={TAUX_CHANGE} />}
    </div>
  );
};

export default index;
