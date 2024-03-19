import React, { useState } from "react";
import Filter from "./Filter";
import Table from "../Table";
import {
  avance7jColumns,
  leveesTresorColumns,
  pensionLivreeColumns,
  placementsTresorColumns,
  placementsTresorJColumns,
  pretsGarantisColumns,
  tmpColumns,
} from "./columns";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import IndiceTMP from "../charts/FixedIncome/IndiceTMP";
import IndiceMonia from "../charts/FixedIncome/IndiceMonia";
import EvolInsuffisanceLiquidite from "../charts/FixedIncome/EvolInsuffisanceLiquidite";
import Insuffisance from "../charts/FixedIncome/Insuffisance";
import GridContainer, { GridItem } from "../Ui/GridContainer";
import TauxSec from "../charts/FixedIncome/TauxSec";
import Commentaires from "./Commentaires";
import groupBy from "../../utils/groupBy";
import CourbeTaux from "../charts/FixedIncome/CourbeTaux";

const Index = () => {
  const [show, setShow] = useState(false);
  const { data } = useSelector((state) => state.fixedIncome);
  return (
    <>
      <Filter {...{ setShow }} />
      <Box className="flex flex-col gap-8 my-2">
        {show && data.TMPInterbancaire.length > 0 && (
          <div>
            <h3>TMP interbancaire</h3>
            <Table rows={data.TMPInterbancaire} columns={tmpColumns} />
          </div>
        )}
        <GridContainer>
          {show && data.indiceTMP.length > 0 && (
            <GridItem>
              <IndiceTMP data={data.indiceTMP} />
            </GridItem>
          )}
          {show && data.indiceMonia.length > 0 && (
            <GridItem>
              <IndiceMonia data={data.indiceMonia} />
            </GridItem>
          )}
        </GridContainer>
        {show && data.evolInsuffisanceLiquidite.length > 0 && (
          <EvolInsuffisanceLiquidite data={data.evolInsuffisanceLiquidite} />
        )}
        {show && data.insuffisance.length > 0 && (
          <Insuffisance data={data.insuffisance} />
        )}
        {show && data.avance7j.length > 0 && (
          <div>
            <h3>Avances à 7 jours (M MAD)</h3>
            <Table rows={data.avance7j} columns={avance7jColumns} />
          </div>
        )}
        <GridContainer extraCss="mb-12">
          {show && data.instrumentSwap.length > 0 && (
            <GridItem>
              <h3>Swap de change (M MAD)</h3>
              <Table
                rows={data.instrumentSwap}
                columns={instrumentSwap}
                className="h-full"
              />
            </GridItem>
          )}
          {show && data.pensionLivree.length > 0 && (
            <GridItem>
              <h3>Pension livrée (M MAD)</h3>
              <Table
                rows={data.pensionLivree}
                columns={pensionLivreeColumns}
                className="h-full"
              />
            </GridItem>
          )}
        </GridContainer>
        {show && data.pretsGarantis.length > 0 && (
          <div>
            <h3>Prêts garantis (M MAD)</h3>
            <Table rows={data.pretsGarantis} columns={pretsGarantisColumns} />
          </div>
        )}
        <GridContainer extraCss="mb-12">
          {show && data.placementsTresor.length > 0 && (
            <GridItem>
              <h3>Placements hebdomadaires du Trésor</h3>
              <Table
                rows={data.placementsTresor}
                columns={placementsTresorColumns}
              />
            </GridItem>
          )}
          {show && data.placementsTresorJour.length > 0 && (
            <GridItem>
              <h3>Placements du Trésor par jour</h3>
              <Table
                rows={data.placementsTresorJour}
                columns={placementsTresorJColumns}
              />
            </GridItem>
          )}
        </GridContainer>
        {show && data.leveesTresor.length > 0 && (
          <div>
            <h3>Levées du Trésor</h3>
            <Table rows={data.leveesTresor} columns={leveesTresorColumns} />
          </div>
        )}
        <GridContainer>
          {show && data.tauxPrimaire.length > 0 && (
            <GridItem>
              <CourbeTaux
                data={data.tauxPrimaire}
                title="Courbe primaire des taux"
                isPrimaire
              />
            </GridItem>
          )}
          {show && data.tauxSecondaire.length > 0 && (
            <GridItem>
              <CourbeTaux
                data={data.tauxSecondaire}
                title="Courbe secondaire des taux"
              />
            </GridItem>
          )}
        </GridContainer>
        {show && data.tauxSecondaire.length > 0 && (
          <div>
            <TauxSec data={data.tauxSecondaire} />
          </div>
        )}
        {show && data.commentaires.length > 0 && (
          <Commentaires data={groupBy(data.commentaires, "titre")} />
        )}
      </Box>
    </>
  );
};

export default Index;
