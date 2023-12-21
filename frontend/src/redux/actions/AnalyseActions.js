import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";
import apiMarko from "../../api/apiMarko";

const countTypePositions = (data, propertyNames) => {
  const count = { Achat: 0, Vente: 0, Neutre: 0 };

  data.forEach((item) => {
    propertyNames.forEach((propertyName) => {
      const lowerCasePropertyName = propertyName.toLowerCase();
      const propertyValue = item[propertyName]?.toLowerCase();

      if (propertyValue && propertyValue.includes("achat")) {
        count.Achat++;
      } else if (propertyValue && propertyValue.includes("vente")) {
        count.Vente++;
      } else if (propertyValue && propertyValue.includes("neutre")) {
        count.Neutre++;
      }
    });
  });

  return count;
};
const resumeText = (value) => {
  let text = "";
  if (value > 80) {
    text = "Achat Fort";
  }
  if (value <= 20) {
    text = "Vente Forte";
  } else if (value <= 40) {
    text = "Vente";
  } else if (value <= 60) {
    text = "Neutre";
  } else if (value <= 80) {
    text = "Achat";
  }
  return text;
};
const determineResume = (countObj) => {
  const { Achat, Vente, Neutre } = countObj;
  const achatValue = (50 * Achat) / (Achat + Vente + Neutre);
  const venteValue = (-50 * Vente) / (Achat + Vente + Neutre);
  const value = achatValue + venteValue + 50;
  const text = resumeText(value);
  return { value, text };
};

export const getAnalysesData = createAsyncThunk(
  "analyse/getAnalysesData",
  async ({ titre }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/analyse`, {
        params: { titre },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        if (error.response.status === 401) {
          return thunkAPI.rejectWithValue({
            status: 401,
            message: error.response.data.message,
          });
        }
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getIndicateursData = createAsyncThunk(
  "analyse/getIndicateursData",
  async (_, thunkAPI) => {
    try {
      const response = await apiMarko.get(
        `/GETAPI?INDICATEURS_TECHNIQUES_BVC&12/12/2023&HPS`
      );
      const response2 = await apiMarko.get(
        `/GETAPI?MOYENNE_MOBILE_BVC&12/12/2023&HPS&0.1`
      );
      console.log("getIndicateursData", response.data);
      console.log("MOYENNE_MOBILE_BVC", response2.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("indicateurs tech rejected");
    }
  }
);
