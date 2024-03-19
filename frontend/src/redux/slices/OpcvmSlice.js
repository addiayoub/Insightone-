import { createSlice } from "@reduxjs/toolkit";
import {
  contraintesPoids_,
  evolutionB100Frontiere_,
  getData,
  getDataSet,
  getMatriceCorr,
  getSocietesGestion,
  portefeuilleAleatoire_,
  portefeuilleMarkowitz_,
  portefeuilleMinimumVariance_,
  portefeuilleRendementMaximale_,
  portefeuilleSimule_,
} from "../actions/OpcvmActions";
import { formatDate } from "../../utils/FormatDate";
const initialContraintes = {
  performance: { min: null, max: null },
  cours: {
    min: null,
    max: null,
  },
  volatilite: { min: null, max: null },
  nbSemaine: { min: null, max: null },
};
const initialState = {
  data: {
    loading: false,
    data: [],
    filteredData: [],
    libelles: [],
    error: null,
    contraintes: initialContraintes,
  },
  societes: {
    loading: false,
    data: [],
    error: null,
  },
  dataSet: {
    loading: false,
    data: [],
    filteredData: [],
    error: null,
  },
  matriceCorr: {
    loading: false,
    data: [],
    error: null,
  },
  contraintesPoids: {
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
  portefeuilleRendementMaximale: {
    loading: false,
    error: null,
    data: [],
  },
  portefeuilleMarkowitz: {
    loading: false,
    data: [],
    error: null,
  },
  portefeuilleSimule: {
    loading: false,
    data: [],
    error: null,
  },
  portefeuillesAleatoires: {
    loading: false,
    error: null,
    data: [],
    frontiere: [],
    frontiereWeights: [],
  },
  evolutionB100Frontiere: {
    loading: false,
    error: null,
    data: [],
  },
  params: {
    dateDebut: null,
    dateFin: null,
    societes: [],
    classes: [],
    types: [],
  },
};
const opcvmSlice = createSlice({
  name: "opcvm",
  initialState,
  reducers: {
    setContraintes: ({ data }, { payload }) => {
      data.contraintes = payload;
    },
    setFilteredData: ({ data }, { payload }) => {
      data.filteredData = payload;
    },
    setLibelles: ({ data }, { payload }) => {
      data.libelles = payload.map((item) => item.DENOMINATION_OPCVM);
    },
    setFilteredDataSet: ({ dataSet }, { payload }) => {
      dataSet.filteredData = payload;
    },
    setParams: (state, { payload }) => {
      state.params = {
        ...payload,
        dateDebut: formatDate(payload.dateDebut["$d"]),
        dateFin: formatDate(payload.dateFin["$d"]),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSocietesGestion.pending, ({ societes }) => {
      societes.loading = true;
    });
    builder.addCase(
      getSocietesGestion.fulfilled,
      ({ societes }, { payload }) => {
        societes.data = payload.data;
        societes.loading = false;
      }
    );
    builder.addCase(
      getSocietesGestion.rejected,
      ({ societes }, { payload }) => {
        if (payload.status === 401) {
          societes.error = payload.message;
          societes.data = [];
        } else {
          societes.error = payload;
        }
        societes.loading = false;
      }
    );

    // Get Data
    builder.addCase(getData.pending, ({ data }) => {
      data.loading = true;
    });
    builder.addCase(getData.fulfilled, ({ data }, { payload }) => {
      data.data = payload.data;
      data.filteredData = payload.data;
      data.libelles = payload.libelles;
      data.contraintes = payload.contraintes;
      data.loading = false;
    });
    builder.addCase(getData.rejected, ({ data }, { payload }) => {
      data.data = [];
      data.filteredData = [];
      data.libelles = [];
      data.error = payload;
      data.loading = false;
    });

    // Data Set
    builder.addCase(getDataSet.pending, ({ dataSet }) => {
      dataSet.loading = true;
    });
    builder.addCase(getDataSet.fulfilled, ({ dataSet }, { payload }) => {
      dataSet.data = payload.dataset;
      dataSet.filteredData = payload.dataset;
      dataSet.loading = false;
    });
    builder.addCase(getDataSet.rejected, ({ dataSet }, { payload }) => {
      console.log("getDataSet error payload", payload);
      dataSet.loading = false;
      dataSet.error = payload;
      dataSet.data = [];
      dataSet.filteredData = [];
    });

    // MatriceCorr
    builder.addCase(getMatriceCorr.pending, ({ matriceCorr }) => {
      matriceCorr.loading = true;
    });
    builder.addCase(
      getMatriceCorr.fulfilled,
      ({ matriceCorr }, { payload }) => {
        matriceCorr.data = payload.corr_matrix;
        matriceCorr.loading = false;
      }
    );
    builder.addCase(getMatriceCorr.rejected, ({ matriceCorr }, { payload }) => {
      console.log("getMatriceCorr error payload", payload);
      matriceCorr.loading = false;
      matriceCorr.data = [];
      matriceCorr.error = payload;
    });

    // Contraintes Poids
    builder.addCase(contraintesPoids_.pending, ({ contraintesPoids }) => {
      contraintesPoids.loading = true;
    });
    builder.addCase(
      contraintesPoids_.fulfilled,
      ({ contraintesPoids }, { payload }) => {
        contraintesPoids.data = payload;
        contraintesPoids.loading = false;
      }
    );
    builder.addCase(
      contraintesPoids_.rejected,
      ({ contraintesPoids }, { payload }) => {
        console.log("CONTRAINTES_POIDS error payload", payload);
        contraintesPoids.loading = false;
        contraintesPoids.data = [];
        contraintesPoids.error = payload;
      }
    );
    // portefeuilleMinimumVariance
    builder.addCase(
      portefeuilleMinimumVariance_.pending,
      ({ portefeuilleMinimumVariance }) => {
        portefeuilleMinimumVariance.loading = true;
      }
    );
    builder.addCase(
      portefeuilleMinimumVariance_.fulfilled,
      ({ portefeuilleMinimumVariance }, { payload }) => {
        portefeuilleMinimumVariance.data = payload.data;
        portefeuilleMinimumVariance.poidsEqui = payload.poidsEqui;
        portefeuilleMinimumVariance.loading = false;
      }
    );
    builder.addCase(
      portefeuilleMinimumVariance_.rejected,
      ({ portefeuilleMinimumVariance }, { payload }) => {
        portefeuilleMinimumVariance.loading = false;
        portefeuilleMinimumVariance.data = [];
        portefeuilleMinimumVariance.poidsEqui = [];
        portefeuilleMinimumVariance.error = payload;
      }
    );

    // portefeuilleRendementMaximale;
    builder.addCase(
      portefeuilleRendementMaximale_.pending,
      ({ portefeuilleRendementMaximale }) => {
        portefeuilleRendementMaximale.loading = true;
      }
    );
    builder.addCase(
      portefeuilleRendementMaximale_.fulfilled,
      ({ portefeuilleRendementMaximale }, { payload }) => {
        portefeuilleRendementMaximale.data = payload["Les poids optimaux"];
        portefeuilleRendementMaximale.loading = false;
      }
    );
    builder.addCase(
      portefeuilleRendementMaximale_.rejected,
      ({ portefeuilleRendementMaximale }, { payload }) => {
        portefeuilleRendementMaximale.loading = false;
        portefeuilleRendementMaximale.data = [];
        portefeuilleRendementMaximale.error = payload;
      }
    );

    // portefeuilleMarkowitz;
    builder.addCase(
      portefeuilleMarkowitz_.pending,
      ({ portefeuilleMarkowitz }) => {
        portefeuilleMarkowitz.loading = true;
      }
    );
    builder.addCase(
      portefeuilleMarkowitz_.fulfilled,
      ({ portefeuilleMarkowitz }, { payload }) => {
        portefeuilleMarkowitz.data = payload["Les poids optimaux"];
        portefeuilleMarkowitz.loading = false;
      }
    );
    builder.addCase(
      portefeuilleMarkowitz_.rejected,
      ({ portefeuilleMarkowitz }, { payload }) => {
        portefeuilleMarkowitz.loading = false;
        portefeuilleMarkowitz.data = [];
        portefeuilleMarkowitz.error = payload;
      }
    );

    // portefeuilleSimule;
    builder.addCase(portefeuilleSimule_.pending, ({ portefeuilleSimule }) => {
      portefeuilleSimule.loading = true;
    });
    builder.addCase(
      portefeuilleSimule_.fulfilled,
      ({ portefeuilleSimule }, { payload }) => {
        portefeuilleSimule.data =
          payload["Evolution base 100 des Portefeuille simulé"];
        portefeuilleSimule.loading = false;
      }
    );
    builder.addCase(
      portefeuilleSimule_.rejected,
      ({ portefeuilleSimule }, { payload }) => {
        portefeuilleSimule.loading = false;
        portefeuilleSimule.data = [];
        portefeuilleSimule.error = payload;
      }
    );

    // portefeuilleAleatoire_;
    builder.addCase(
      portefeuilleAleatoire_.pending,
      ({ portefeuillesAleatoires }) => {
        portefeuillesAleatoires.loading = true;
      }
    );
    builder.addCase(
      portefeuilleAleatoire_.fulfilled,
      ({ portefeuillesAleatoires }, { payload }) => {
        portefeuillesAleatoires.data = payload.data;
        portefeuillesAleatoires.frontiere = payload.frontiere;
        portefeuillesAleatoires.frontiereWeights = payload.frontiereWeights;
        portefeuillesAleatoires.loading = false;
      }
    );
    builder.addCase(
      portefeuilleAleatoire_.rejected,
      ({ portefeuillesAleatoires }, { payload }) => {
        portefeuillesAleatoires.loading = false;
        portefeuillesAleatoires.frontiere = [];
        portefeuillesAleatoires.frontiereWeights = [];
        portefeuillesAleatoires.error = payload;
      }
    );

    // evolutionB100Frontiere_;
    builder.addCase(
      evolutionB100Frontiere_.pending,
      ({ evolutionB100Frontiere }) => {
        evolutionB100Frontiere.loading = true;
      }
    );
    builder.addCase(
      evolutionB100Frontiere_.fulfilled,
      ({ evolutionB100Frontiere }, { payload }) => {
        console.log("evolutionB100Frontiere payload", payload);
        evolutionB100Frontiere.data = payload;
        evolutionB100Frontiere.loading = false;
      }
    );
    builder.addCase(
      evolutionB100Frontiere_.rejected,
      ({ evolutionB100Frontiere }, { payload }) => {
        evolutionB100Frontiere.loading = false;
        evolutionB100Frontiere.data = [];
        evolutionB100Frontiere.error = payload;
      }
    );
  },
});

export default opcvmSlice.reducer;
export const {
  setFilteredData,
  setContraintes,
  setLibelles,
  setParams,
  setFilteredDataSet,
} = opcvmSlice.actions;
