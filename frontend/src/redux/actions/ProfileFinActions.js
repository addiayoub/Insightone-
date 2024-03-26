import { createAsyncThunk } from "@reduxjs/toolkit";
import getAPI from "../../api/getAPI";
import { formatDate } from "../../utils/FormatDate";

export const getData = createAsyncThunk(
  "profileFinacier/getData",
  async ({ titre, periode }, thunkAPI) => {
    try {
      const urls = [
        {
          url: "Compte de résultat",
          params: `&${periode}&${titre}`,
          varName: "cmptRes",
        },
        {
          url: "Bilan",
          params: `&${periode}&${titre}`,
          varName: "bilan",
        },

        {
          url: "Dividende_Info",
          params: `&${titre}`,
          varName: "dividende",
        },
        {
          url: "BILAN_RESUME",
          params: `&${periode}&${titre}`,
          varName: "bilanRes",
        },
        {
          url: "COMPTE_RESULTAT_RESUME",
          params: `&${periode}&${titre}`,
          varName: "cmptResResu",
        },
        {
          url: "FLUX_TRESORERIE_RESUME",
          params: `&${periode}&${titre}`,
          varName: "fluxRes",
        },
      ];
      const [
        { cmptRes },
        { bilan },
        { dividende },
        { bilanRes },
        { cmptResResu },
        { fluxRes },
      ] = await Promise.all(
        urls.map(async ({ url, varName, params }) => {
          try {
            const response = await getAPI.get(`GETAPI?${url}${params}`);
            // console.log(`response ${varName}:`, response);
            return { [varName]: response.data };
          } catch (error) {
            console.log(error);
            return [];
          }
        })
      );
      return {
        cmptRes: cmptRes.slice(1),
        bilan: bilan.slice(1),
        dividende,
        bilanRes: transformData(bilanRes),
        cmptResResu: transformData(cmptResResu),
        fluxRes: transformData(fluxRes),
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const getNews = createAsyncThunk(
  "profileFinacier/getNews",
  async ({ dateDebut, dateFin }, thunkAPI) => {
    try {
      [dateDebut, dateFin] = [
        formatDate(dateDebut["$d"]),
        formatDate(dateFin["$d"]),
      ];
      const response = await getAPI.get(`GETAPI?NEWS&${dateDebut}&${dateFin}`);
      localStorage.setItem("news", JSON.stringify(response.data));
      console.log("get News data", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

const transformData = (data) => {
  const result = data.reduce((acc, item) => {
    const { SEANCE, CATEGORIE, VALEUR } = item;

    // Check if SEANCE already exists in the accumulator
    const existingIndex = acc.findIndex((entry) => entry.SEANCE === SEANCE);
    if (existingIndex !== -1) {
      // SEANCE already exists, add VALEUR to the corresponding CATEGORIE
      acc[existingIndex][CATEGORIE] = VALEUR;
    } else {
      // SEANCE doesn't exist, create a new entry with SEANCE and VALEUR for CATEGORIE
      const newData = {
        SEANCE,
        [CATEGORIE]: VALEUR,
      };
      acc.push(newData);
    }

    return acc;
  }, []);
  // {
  //       "SEANCE": "2022-12-31T00:00:00.000+00:00",
  //       "Chiffre d'affaires": 35731,
  //       "Bénéfice brut": 27698,
  //       "Résultat des opérations": 8987,
  //       "Résultat net part du groupe": 2750
  //   }
  // const r1 =
  return result.reverse();
};
