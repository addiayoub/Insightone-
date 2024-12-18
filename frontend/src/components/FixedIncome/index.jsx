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
import { getColumns } from "../PerfGlis/columns";
import Slider, { SliderItem } from "../Slider";
import PerfTable from "../PerfGlis/PerfTable";

const Index = () => {
  const [show, setShow] = useState(false);
  const { data } = useSelector((state) => state.fixedIncome);
  const sliderData = [...data.perfMBI, ...data.perfNominal];
  console.log("sliderdata", data.perfMBI, show);
  return (
    <>
      <Filter {...{ setShow }} />
      {show && sliderData.length > 0 && (
        <Slider>
          {sliderData.map((item) => {
            return (
              <SliderItem
                key={item.INDICE}
                name={item.INDICE}
                left={item.perf_1S * 100}
                leftPrefix={"1S: "}
                leftWithColor
                middle={item.perf_1AN * 100}
                middlePrefix={"1AN: "}
                right={item.perf_YTD * 100}
                rightPrefix={"YTD: "}
                rightWithColor
              />
            );
          })}
        </Slider>
      )}
      <Box className="flex flex-col gap-8 my-2">
        {show && data.TMPInterbancaire.length > 0 && (
          <Table
            rows={data.TMPInterbancaire}
            columns={tmpColumns}
            legend="TMP interbancaire"
          />
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

        {show && data.perfMBI.length > 0 && (
          <>
            <PerfTable data={data.perfMBI} isFirst title="Performance MBI" />
            <PerfTable data={data.perfMBI} title="Performance MBI Annualisée" />
          </>
        )}
        {show && data.perfNominal.length > 0 && (
          <Box>
            <PerfTable
              data={data.perfNominal}
              isFirst
              title="Performance Nominal"
            />
            <PerfTable
              data={data.perfNominal}
              title="Performance Nominal Annualisée"
            />
          </Box>
        )}
        {show && data.evolInsuffisanceLiquidite.length > 0 && (
          <EvolInsuffisanceLiquidite data={data.evolInsuffisanceLiquidite} />
        )}
        {show && data.insuffisance.length > 0 && (
          <Insuffisance data={data.insuffisance} />
        )}
        {show && data.avance7j.length > 0 && (
          <Table
            rows={data.avance7j}
            columns={avance7jColumns}
            legend="Avances à 7 jours (M MAD)"
          />
        )}
        <GridContainer extraCss="mb-12">
          {/* {show && data.instrumentSwap.length > 0 && (
            <GridItem>
              <Table
                rows={data.instrumentSwap}
                columns={instrumentSwap}
                legend="Swap de change (M MAD)"
                className="h-full"
              />
            </GridItem>
          )} */}
          {show && data.pensionLivree.length > 0 && (
            <GridItem>
              <Table
                rows={data.pensionLivree}
                columns={pensionLivreeColumns}
                className="h-full"
                legend="Pension livrée (M MAD)"
              />
            </GridItem>
          )}
        </GridContainer>
        {show && data.pretsGarantis.length > 0 && (
          <Table
            rows={data.pretsGarantis}
            columns={pretsGarantisColumns}
            legend="Prêts garantis (M MAD)"
          />
        )}
        <GridContainer extraCss="mb-12">
          {show && data.placementsTresor.length > 0 && (
            <GridItem>
              <Table
                rows={data.placementsTresor}
                columns={placementsTresorColumns}
                legend="Placements hebdomadaires du Trésor"
              />
            </GridItem>
          )}
          {show && data.placementsTresorJour.length > 0 && (
            <GridItem>
              <Table
                rows={data.placementsTresorJour}
                columns={placementsTresorJColumns}
                legend="Placements du Trésor par jour"
              />
            </GridItem>
          )}
        </GridContainer>
        {show && data.leveesTresor.length > 0 && (
          <Table
            rows={data.leveesTresor}
            columns={leveesTresorColumns}
            pageSize={10}
            legend="Levées du Trésor"
          />
        )}
        <GridContainer>
          {show && data.tauxPrimaire.length > 0 && (
            <GridItem>
              <CourbeTaux data={data.tauxPrimaire} isPrimaire />
            </GridItem>
          )}
          {show && data.tauxSecondaire.length > 0 && (
            <GridItem>
              <CourbeTaux data={data.tauxSecondaire} />
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
