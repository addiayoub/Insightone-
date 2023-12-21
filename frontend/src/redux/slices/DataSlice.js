import { createSlice } from "@reduxjs/toolkit";
import {
  CONTRAINTES_POIDS,
  EVOLUTION_B100_PORTEFEUILLE_SIMULE,
  EVOLUTION_B100_PORTEFEUILLE_SIMULE2,
  GENERATION_PORTEFEUILLES_ALEATOIRES,
  Matrice_correlation_Covariance,
  getData,
  getDataWithContraints,
  getSecteurs,
  portefeuille_minimum_variance,
  portefeuille_Rendement_Maximale,
  DISCRETISATION_RENDEMENTS,
  EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE,
  filterMarkoAction,
  getDataSet,
  portefeuille_Markowitz,
  get_poids_masi_all,
} from "../actions/DataActions";
import { getDataTest } from "../actions/DataActions";

const initialState = {
  loading: false,
  error: null,
  data: [],
  dataTest: { data: [], loading: false, error: null },
  dataWithContraints: { data: [], loading: false, error: null },
  valeurs: [],
  fields: [],
  customization: {
    title: "",
    xAxis: "Seance",
    yAxis1: {
      title: "Variation",
      type: "line",
      color: "#ff0000",
    },
    yAxis2: {
      title: "Valeur",
      type: "line",
      color: "#0000FF",
    },
  },
  contraints: {
    performance: {
      operateur: "",
      value: 0,
    },
    volatilite: {
      operateur: "",
      value: 0,
    },
    vqm: {
      operateur: "",
      value: 0,
    },
    jours: {
      operateur: "",
      value: 0,
    },
  },
  hideChart: true,
  modalIsOpen: false,
  secteurs: {
    loading: false,
    error: null,
    data: [],
  },
  matriceCorrelation: {
    loading: false,
    error: null,
    data: [],
  },
  portefeuilleMinimumVariance: {
    loading: false,
    error: null,
    data: [],
    poidsEqui: [],
  },
  contraintesPoids: {
    loading: false,
    error: null,
    data: [],
  },
  evolutionB100: {
    loading: false,
    error: null,
    data: [],
  },
  evolutionB100Simule2: {
    loading: false,
    error: null,
    data: [],
  },
  portefeuillesAleatoires: {
    loading: false,
    error: null,
    data: [],
    frontiere: [],
    frontiereWeights: [],
  },
  portefeuilleRendementMaximale: {
    loading: false,
    error: null,
    data: [],
  },
  discretisationRendements: {
    loading: false,
    error: null,
    data: [],
  },
  evolutionB100Frontiere: {
    loading: false,
    error: null,
    data: [],
  },
  filterMarko: {
    loading: false,
    data: [],
    filteredData: [],
    contraintes: {
      performance: { min: null, max: null },
      vqm: {
        min: null,
        max: null,
      },
      volatilite: { min: null, max: null },
      nbSemaine: { min: null, max: null },
    },
    error: null,
  },
  dataSet: {
    loading: false,
    data: [],
    error: null,
  },
  portefeuilleMarkowitz: {
    loading: false,
    data: [],
    error: null,
  },
  poidsMasi: {
    loading: false,
    data: [],
    error: null,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.fields = [];
    },
    setCustomization: (state, { payload }) => {
      state.customization = payload;
    },
    resetCustomization: (state) => {
      state.customization = {
        title: "",
        xAxis: "Seance",
        yAxis1: {
          title: "Variation",
          type: "line",
          color: "#ff0000",
        },
        yAxis2: {
          title: "Valeur",
          type: "column",
          color: "#0000FF",
        },
      };
    },
    setContraints: (state, { payload }) => {
      console.log("setContraints", payload);
      state.contraints = payload;
    },
    setFilterMarkoContraintes: ({ filterMarko: { contraintes } }, payload) => {
      contraintes = payload;
    },
    resetContraints: (state) => {
      state.contraints = {
        performance: {
          operateur: "",
          value: "",
        },
        volatilite: {
          operateur: "",
          value: "",
        },
        vqm: {
          operateur: "",
          value: "",
        },
        jours: {
          operateur: "",
          value: "",
        },
      };
    },
    showChart: (state) => {
      state.hideChart = false;
    },
    hideChart: (state) => {
      state.hideChart = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    setFilterMarkoData: ({ filterMarko }, { payload }) => {
      filterMarko.filteredData = payload;
    },
    setValeurs: (state, { payload }) => {
      state.valeurs = payload.map((item) => item.LIBELLE);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.fields = payload.fields;
      state.loading = false;
    });
    builder.addCase(getData.rejected, (state, { payload }) => {
      if (payload.status === 401) {
        state.error = payload.message;
        state.data = [];
      } else {
        state.error = payload;
      }
      state.loading = false;
    });

    builder.addCase(getDataTest.pending, ({ dataTest }) => {
      dataTest.loading = true;
    });
    builder.addCase(getDataTest.fulfilled, ({ dataTest }, { payload }) => {
      dataTest.data = payload.data;
      dataTest.loading = false;
    });
    builder.addCase(getDataTest.rejected, ({ dataTest }, { payload }) => {
      if (payload.status === 401) {
        dataTest.error = payload.message;
        dataTest.data = [];
      } else {
        dataTest.error = payload;
      }
      dataTest.loading = false;
    });

    builder.addCase(getDataWithContraints.pending, ({ dataWithContraints }) => {
      dataWithContraints.loading = true;
    });
    builder.addCase(getDataWithContraints.fulfilled, (state, { payload }) => {
      state.dataWithContraints.loading = false;
      state.dataWithContraints.data = payload.data;
      state.valeurs = payload.valeurs;
    });
    builder.addCase(getDataWithContraints.rejected, (state, { payload }) => {
      if (payload?.status === 401) {
        state.dataWithContraints.error = payload.message;
        state.dataWithContraints.data = [];
        state.valeurs = [];
      } else {
        state.dataWithContraints.error = payload;
      }
      state.dataWithContraints.loading = false;
    });

    builder.addCase(getSecteurs.pending, ({ secteurs }) => {
      secteurs.loading = true;
    });
    builder.addCase(getSecteurs.fulfilled, ({ secteurs }, { payload }) => {
      secteurs.data = payload.data;
      secteurs.loading = false;
    });
    builder.addCase(getSecteurs.rejected, ({ secteurs }, { payload }) => {
      if (payload.status === 401) {
        secteurs.error = payload.message;
        secteurs.data = [];
      } else {
        secteurs.error = payload;
      }
      secteurs.loading = false;
    });

    builder.addCase(
      Matrice_correlation_Covariance.pending,
      ({ matriceCorrelation }) => {
        matriceCorrelation.loading = true;
      }
    );
    builder.addCase(
      Matrice_correlation_Covariance.fulfilled,
      ({ matriceCorrelation }, { payload }) => {
        matriceCorrelation.data = payload.corr_matrix;
        matriceCorrelation.loading = false;
      }
    );
    builder.addCase(
      Matrice_correlation_Covariance.rejected,
      ({ matriceCorrelation }, { payload }) => {
        matriceCorrelation.loading = false;
        if (payload?.status === 401) {
          matriceCorrelation.error = payload.message;
          matriceCorrelation.data = [];
        } else {
          matriceCorrelation.error = payload;
        }
      }
    );

    builder.addCase(CONTRAINTES_POIDS.pending, ({ contraintesPoids }) => {
      contraintesPoids.loading = true;
    });
    builder.addCase(
      CONTRAINTES_POIDS.fulfilled,
      ({ contraintesPoids }, { payload }) => {
        contraintesPoids.data = payload;
        contraintesPoids.loading = false;
      }
    );
    builder.addCase(
      CONTRAINTES_POIDS.rejected,
      ({ contraintesPoids }, { payload }) => {
        contraintesPoids.loading = false;
        if (payload?.status === 401) {
          contraintesPoids.error = payload.message;
          contraintesPoids.data = [];
        } else {
          contraintesPoids.error = payload;
        }
      }
    );

    // portefeuille_minimum_variance
    builder.addCase(
      portefeuille_minimum_variance.pending,
      ({ portefeuilleMinimumVariance }) => {
        portefeuilleMinimumVariance.loading = true;
      }
    );
    builder.addCase(
      portefeuille_minimum_variance.fulfilled,
      ({ portefeuilleMinimumVariance }, { payload }) => {
        portefeuilleMinimumVariance.data = payload.data;
        portefeuilleMinimumVariance.poidsEqui = payload.poidsEqui;
        portefeuilleMinimumVariance.loading = false;
      }
    );
    builder.addCase(
      portefeuille_minimum_variance.rejected,
      ({ portefeuilleMinimumVariance }, { payload }) => {
        portefeuilleMinimumVariance.loading = false;
        portefeuilleMinimumVariance.data = [];
        portefeuilleMinimumVariance.poidsEqui = [];
        if (payload?.status === 401) {
          portefeuilleMinimumVariance.error = payload.message;
        } else {
          portefeuilleMinimumVariance.error = payload;
        }
      }
    );
    // PoidsMasi
    builder.addCase(get_poids_masi_all.pending, ({ poidsMasi }) => {
      poidsMasi.loading = true;
    });
    builder.addCase(
      get_poids_masi_all.fulfilled,
      ({ poidsMasi }, { payload }) => {
        poidsMasi.data = payload.df_Poids_MASI;
        poidsMasi.loading = false;
      }
    );
    builder.addCase(
      get_poids_masi_all.rejected,
      ({ poidsMasi }, { payload }) => {
        poidsMasi.loading = false;
        if (payload?.status === 401) {
          poidsMasi.error = payload.message;
          poidsMasi.data = [];
        } else {
          poidsMasi.error = payload;
        }
      }
    );
    // portefeuille_Markowitz
    builder.addCase(
      portefeuille_Markowitz.pending,
      ({ portefeuilleMarkowitz }) => {
        portefeuilleMarkowitz.loading = true;
      }
    );
    builder.addCase(
      portefeuille_Markowitz.fulfilled,
      ({ portefeuilleMarkowitz }, { payload }) => {
        portefeuilleMarkowitz.data = payload["Les poids optimaux"];
        portefeuilleMarkowitz.loading = false;
      }
    );
    builder.addCase(
      portefeuille_Markowitz.rejected,
      ({ portefeuilleMarkowitz }, { payload }) => {
        portefeuilleMarkowitz.loading = false;
        if (payload?.status === 401) {
          portefeuilleMarkowitz.error = payload.message;
          portefeuilleMarkowitz.data = [];
        } else {
          portefeuilleMarkowitz.error = payload;
        }
      }
    );

    // EVOLUTION_B100_PORTEFEUILLE_SIMULE
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE.pending,
      ({ evolutionB100 }) => {
        evolutionB100.loading = true;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE.fulfilled,
      ({ evolutionB100 }, { payload }) => {
        evolutionB100.data =
          payload["Evolution base 100 des Portefeuille simulé"];
        evolutionB100.loading = false;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE.rejected,
      ({ evolutionB100 }, { payload }) => {
        evolutionB100.loading = false;
        if (payload?.status === 401) {
          evolutionB100.error = payload.message;
          evolutionB100.data = [];
        } else {
          evolutionB100.error = payload;
        }
      }
    );

    // EVOLUTION_B100_PORTEFEUILLE_SIMULE2
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE2.pending,
      ({ evolutionB100Simule2 }) => {
        evolutionB100Simule2.loading = true;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE2.fulfilled,
      ({ evolutionB100Simule2 }, { payload }) => {
        evolutionB100Simule2.data =
          payload["Evolution base 100 des Portefeuille simulé"];
        evolutionB100Simule2.loading = false;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_SIMULE2.rejected,
      ({ evolutionB100Simule2 }, { payload }) => {
        evolutionB100Simule2.loading = false;
        if (payload?.status === 401) {
          evolutionB100Simule2.error = payload.message;
          evolutionB100Simule2.data = [];
        } else {
          evolutionB100Simule2.error = payload;
        }
      }
    );

    // GENERATION_PORTEFEUILLES_ALEATOIRES
    builder.addCase(
      GENERATION_PORTEFEUILLES_ALEATOIRES.pending,
      ({ portefeuillesAleatoires }) => {
        portefeuillesAleatoires.loading = true;
      }
    );
    builder.addCase(
      GENERATION_PORTEFEUILLES_ALEATOIRES.fulfilled,
      ({ portefeuillesAleatoires }, { payload }) => {
        portefeuillesAleatoires.data = payload.data;
        portefeuillesAleatoires.frontiere = payload.frontiere;
        portefeuillesAleatoires.frontiereWeights = payload.frontiereWeights;
        portefeuillesAleatoires.loading = false;
      }
    );
    builder.addCase(
      GENERATION_PORTEFEUILLES_ALEATOIRES.rejected,
      ({ portefeuillesAleatoires }, { payload }) => {
        portefeuillesAleatoires.loading = false;
        portefeuillesAleatoires.data = [];
        portefeuillesAleatoires.frontiere = [];
        portefeuillesAleatoires.frontiereWeights = [];
        if (payload?.status === 401) {
          portefeuillesAleatoires.error = payload.message;
        } else {
          portefeuillesAleatoires.error = payload;
        }
      }
    );

    // portefeuille_Rendement_Maximale;
    builder.addCase(
      portefeuille_Rendement_Maximale.pending,
      ({ portefeuilleRendementMaximale }) => {
        portefeuilleRendementMaximale.loading = true;
      }
    );
    builder.addCase(
      portefeuille_Rendement_Maximale.fulfilled,
      ({ portefeuilleRendementMaximale }, { payload }) => {
        portefeuilleRendementMaximale.data = payload["Les poids optimaux"];
        portefeuilleRendementMaximale.loading = false;
      }
    );
    builder.addCase(
      portefeuille_Rendement_Maximale.rejected,
      ({ portefeuilleRendementMaximale }, { payload }) => {
        portefeuilleRendementMaximale.loading = false;
        if (payload?.status === 401) {
          portefeuilleRendementMaximale.error = payload.message;
          portefeuilleRendementMaximale.data = [];
        } else {
          portefeuilleRendementMaximale.error = payload;
        }
      }
    );

    // DISCRETISATION_RENDEMENTS;
    builder.addCase(
      DISCRETISATION_RENDEMENTS.pending,
      ({ discretisationRendements }) => {
        discretisationRendements.loading = true;
      }
    );
    builder.addCase(
      DISCRETISATION_RENDEMENTS.fulfilled,
      ({ discretisationRendements }, { payload }) => {
        discretisationRendements.data = payload;
        discretisationRendements.loading = false;
      }
    );
    builder.addCase(
      DISCRETISATION_RENDEMENTS.rejected,
      ({ discretisationRendements }, { payload }) => {
        discretisationRendements.loading = false;
        if (payload?.status === 401) {
          discretisationRendements.error = payload.message;
          discretisationRendements.data = [];
        } else {
          discretisationRendements.error = payload;
        }
      }
    );

    // EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE;
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE.pending,
      ({ evolutionB100Frontiere }) => {
        evolutionB100Frontiere.loading = true;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE.fulfilled,
      ({ evolutionB100Frontiere }, { payload }) => {
        evolutionB100Frontiere.data = payload;
        evolutionB100Frontiere.loading = false;
      }
    );
    builder.addCase(
      EVOLUTION_B100_PORTEFEUILLE_FRONTIERE_EFFICIENTE.rejected,
      ({ evolutionB100Frontiere }, { payload }) => {
        evolutionB100Frontiere.loading = false;
        if (payload?.status === 401) {
          evolutionB100Frontiere.error = payload.message;
          evolutionB100Frontiere.data = [];
        } else {
          evolutionB100Frontiere.error = payload;
        }
      }
    );

    // Filter Marko
    builder.addCase(filterMarkoAction.pending, ({ filterMarko }) => {
      filterMarko.loading = true;
    });
    builder.addCase(filterMarkoAction.fulfilled, (state, { payload }) => {
      console.log("Payload", payload);
      state.filterMarko.loading = false;
      state.filterMarko.data = payload.data;
      state.filterMarko.contraintes = payload.contraintes;
      state.filterMarko.filteredData = payload.data;
      state.valeurs = payload.valeurs;
    });
    builder.addCase(filterMarkoAction.rejected, (state, { payload }) => {
      if (payload?.status === 401) {
        state.filterMarko.error = payload.message;
        state.filterMarko.data = [];
        state.filterMarko.contraintes = {
          performance: { min: null, max: null },
          volatilite: { min: null, max: null },
          nbSemaine: { min: null, max: null },
        };
        state.filterMarko.filteredData = [];
        state.valeurs = [];
      } else {
        state.filterMarko.error = payload;
      }
      state.filterMarko.loading = false;
    });

    // Data Set
    builder.addCase(getDataSet.pending, ({ dataSet }) => {
      dataSet.loading = true;
    });
    builder.addCase(getDataSet.fulfilled, (state, { payload }) => {
      state.dataSet.loading = false;
      state.dataSet.data = payload.dataset;
    });
    builder.addCase(getDataSet.rejected, (state, { payload }) => {
      state.dataSet.loading = false;
      state.dataSet.error = payload.message;
    });
  },
});

export const {
  resetData,
  setCustomization,
  showChart,
  hideChart,
  closeModal,
  openModal,
  resetCustomization,
  setContraints,
  resetContraints,
  setFilterMarkoData,
  setFilterMarkoContraintes,
  setValeurs,
} = dataSlice.actions;
export default dataSlice.reducer;
