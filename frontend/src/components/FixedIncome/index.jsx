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
import { columns } from "../PerfGlis/columns";
const dd = [
  {
    ORDRE: 1,
    Seance: "2024-03-15",
    INDICE: "MBI CT",
    CLASSE: "TAUX",
    CATEGORIE: "MBI",
    perf_1S: 0.0005788274034312924,
    perf_2S: 0.0012634492550929188,
    perf_1M: 0.0025999944283638943,
    perf_2M: 0.004617501203389995,
    perf_3M: 0.007505876484582119,
    perf_6M: 0.01602042452841257,
    perf_1AN: 0.03358596754901333,
    perf_2ANS: 0.04911644843684937,
    perf_3ANS: 0.0654271864061875,
    perf_4ANS: 0.08966630130050524,
    perf_5ANS: 0.11541292351107857,
    perf_3M_an: 0.030363229672865977,
    perf_6M_an: 0.03229750305889567,
    perf_1AN_an: 0.03358596754901333,
    perf_2ANS_an: 0.024263856843952825,
    perf_3ANS_an: 0.021349974300252983,
    perf_4ANS_an: 0.021699968662441727,
    perf_5ANS_an: 0.02208528177971769,
  },
  {
    ORDRE: 2,
    Seance: "2024-03-15",
    INDICE: "MBI MT",
    CLASSE: "TAUX",
    CATEGORIE: "MBI",
    perf_1S: 0.0006126876741878728,
    perf_2S: 0.0012591714593510606,
    perf_1M: 0.0037058132781018216,
    perf_2M: 0.004679961963923063,
    perf_3M: 0.009925057395038461,
    perf_6M: 0.024172958420086932,
    perf_1AN: 0.05308414480992596,
    perf_2ANS: 0.030668039234646116,
    perf_3ANS: 0.04778480759017811,
    perf_4ANS: 0.09022617487437112,
    perf_5ANS: 0.12138712735743229,
    perf_3M_an: 0.040295190610663,
    perf_6M_an: 0.04893024875895313,
    perf_1AN_an: 0.05308414480992596,
    perf_2ANS_an: 0.015218222469753684,
    perf_3ANS_an: 0.015681071583515394,
    perf_4ANS_an: 0.021831181454404103,
    perf_5ANS_an: 0.023177810950852695,
  },
  {
    ORDRE: 3,
    Seance: "2024-03-15",
    INDICE: "MBI GLOBAL",
    CLASSE: "TAUX",
    CATEGORIE: "MBI",
    perf_1S: 0.0007980215638700994,
    perf_2S: 0.0022401457041425488,
    perf_1M: 0.005412966348839809,
    perf_2M: 0.005933847325655162,
    perf_3M: 0.022702149389416393,
    perf_6M: 0.04507336753746771,
    perf_1AN: 0.08225814334936787,
    perf_2ANS: 0.010258840923809576,
    perf_3ANS: 0.02965496546675328,
    perf_4ANS: 0.08432965903385425,
    perf_5ANS: 0.1408759951482388,
    perf_3M_an: 0.09394799032739143,
    perf_6M_an: 0.09217834353610299,
    perf_1AN_an: 0.08225814334936787,
    perf_2ANS_an: 0.005116332035157711,
    perf_3ANS_an: 0.009788844325072432,
    perf_4ANS_an: 0.02044672037489592,
    perf_5ANS_an: 0.02670975523807062,
  },
  {
    ORDRE: 4,
    Seance: "2024-03-15",
    INDICE: "MBI MLT",
    CLASSE: "TAUX",
    CATEGORIE: "MBI",
    perf_1S: 0.0006646093489348637,
    perf_2S: 0.0015148513812996978,
    perf_1M: 0.005298220762415928,
    perf_2M: 0.0033716313000962117,
    perf_3M: 0.020311291034565304,
    perf_6M: 0.046259129407503874,
    perf_1AN: 0.08337493504937132,
    perf_2ANS: -0.0031314831976541058,
    perf_3ANS: 0.013732692020774317,
    perf_4ANS: 0.07798699728885472,
    perf_5ANS: 0.13340439864370568,
    perf_3M_an: 0.0837541431696378,
    perf_6M_an: 0.09465816586854792,
    perf_1AN_an: 0.08337493504937132,
    perf_2ANS_an: -0.0015669692952131609,
    perf_3ANS_an: 0.004556763763053473,
    perf_4ANS_an: 0.01895118943038998,
    perf_5ANS_an: 0.02536143416723924,
  },
  {
    ORDRE: 5,
    Seance: "2024-03-15",
    INDICE: "MBI LT",
    CLASSE: "TAUX",
    CATEGORIE: "MBI",
    perf_1S: 0.0011669679988512982,
    perf_2S: 0.004211155573161429,
    perf_1M: 0.008507477514424044,
    perf_2M: 0.00958109494537962,
    perf_3M: 0.04780679469672,
    perf_6M: 0.08743564356583144,
    perf_1AN: 0.1559302465289003,
    perf_2ANS: -0.060051770169921914,
    perf_3ANS: -0.03442322255920438,
    perf_4ANS: 0.04293285237240596,
    perf_5ANS: 0.1572902171795647,
    perf_3M_an: 0.20538238769674688,
    perf_6M_an: 0.18251627889743394,
    perf_1AN_an: 0.1559302465289003,
    perf_2ANS_an: -0.030490727310935828,
    perf_3ANS_an: -0.011608635194726658,
    perf_4ANS_an: 0.010564614239846337,
    perf_5ANS_an: 0.02964723217041021,
  },
];
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

        {show && data.perfMBI.length > 0 && (
          <Box>
            <h3>Performance MBI</h3>
            <Table rows={data.perfMBI} columns={columns} pageSize={10} />
          </Box>
        )}
        {show && data.perfNominal.length > 0 && (
          <Box>
            <h3>Performance Nominal</h3>
            <Table rows={data.perfNominal} columns={columns} pageSize={10} />
          </Box>
        )}
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
