import { createAsyncThunk } from "@reduxjs/toolkit";
import getAPI from "../../api/getAPI";
import { formatDate } from "../../utils/FormatDate";
import { getRandPic } from "../../utils/newsHelpers";

export const getData = createAsyncThunk(
  "profileFinacier/getData",
  async ({ titre, periode }, thunkAPI) => {
    try {
      const urls = [
        {
          url: "Compte_de_resultat",
          params: `?par1=${periode}&par2=${titre}`,
          varName: "cmptRes",
        },
        {
          url: "Bilan",
          params: `?par1=${periode}&par2=${titre}`,
          varName: "bilan",
        },

        {
          url: "Dividende_Info",
          params: `?par1=${titre}`,
          varName: "dividende",
        },
        {
          url: "BILAN_RESUME",
          params: `?par1=${periode}&par2=${titre}`,
          varName: "bilanRes",
        },
        {
          url: "COMPTE_RESULTAT_RESUME",
          params: `?par1=${periode}&par2=${titre}`,
          varName: "cmptResResu",
        },
        {
          url: "FLUX_TRESORERIE_RESUME",
          params: `?par1=${periode}&par2=${titre}`,
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
            const response = await getAPI.get(`${url}${params}`);
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
      const response = await getAPI.get(`NEWS?par1=${dateDebut}&par2=${dateFin}`);
      const news = response.data?.map((item, index) => ({
        ...item,
        id: index + 1,
        image: getRandPic(item.titres_bvc),
      }));
      localStorage.setItem("news", JSON.stringify(news));
      const titres = news.map((item) => item.titres_bvc);
      console.log("get News data", news, titres);
      return news;
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
