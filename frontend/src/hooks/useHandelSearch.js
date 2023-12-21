import React from "react";
import { useState } from "react";
import P_DU_M from "../data/PERFORMANCE_DU_MARCHE_PARAM1.json";
import V_PAR_M_P1 from "../data/VOLUME_PAR_MARCHE_PARAM1.json";
import P_V_MC from "../data/PRINCIPAUX_VOLUMES_MC_PARAM1";
import COMMENTAIRE from "../data/COMMENTAIRE_MARCHE_PARAM1.json";
import T_P_E_P1 from "../data/TITRES_PLUS_ECHANGES_PARAM1.json";
import P_F_H_B_V_P1 from "../data/PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1.json";
import P_F_V_P1 from "../data/PLUS_FORTES_VARIATIONS_PARAM1";
import S_S_P1 from "../data/STATISTIQUES_SOCIETES_PARAM1.json";
import S_S2_P1 from "../data/STATISTIQUES_SOCIETES_2_PARAM1.json";
import P_C_P1 from "../data/PRINCIPALES_CONTRIB_PARAM1.json";
import VAR_SECTEURS from "../data/VAR_SECTEUR_PARAM1.json";
import EV from "../data/EVOLUTION_MASI_PARAM1.json";
import VE from "../data/VOLUME_ECHANGE_PARAM1.json";

const init = {
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
};
export default function useHandelSearch() {
  const [dataObject, setDataObject] = useState(init);
  return <div>useHandelSearch</div>;
}
