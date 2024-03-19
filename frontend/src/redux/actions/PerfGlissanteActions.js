import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://192.168.11.2:30000/perf/performance_glissante_indice/GET/";

export const getPerfMASI = async (date = "19/03/2024") => {
  try {
    console.log("getPerfMASI", date);
    const response = await axios.get(`${url}PERF_MASI`, {
      params: {
        date,
      },
      paramsSerializer: {
        indexes: null,
        encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
      },
    });
    console.log("getPerfMASI", response);
    return response.data;
  } catch (error) {
    console.log("getPerfMASI: error", error);
    return [];
  }
};
export const getPerfSectoriel = async (date = "19/03/2024") => {
  try {
    console.log("getPerfSectoriel", date);
    const response = await axios.get(`${url}PERF_SECTORIEL`, {
      params: {
        date,
      },
      paramsSerializer: {
        indexes: null,
        encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
      },
    });
    console.log("getPerfSectoriel", response);
    return response.data;
  } catch (error) {
    console.log("getPerfSectoriel: error", error);
    return [];
  }
};
export const getPerfMBI = async (date = "19/03/2024") => {
  try {
    console.log("getPerfMBI", date);
    const response = await axios.get(`${url}PERF_MBI`, {
      params: {
        date,
      },
      paramsSerializer: {
        indexes: null,
        encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
      },
    });
    console.log("perfMBI", response);
    return response.data;
  } catch (error) {
    console.log("get Stats: error", error);
    return [];
  }
};
export const getPerfNominal = async (date = "19/03/2024") => {
  try {
    const response = await axios.get(`${url}PERF_NOMINAL`, {
      params: {
        date,
      },
      paramsSerializer: {
        indexes: null,
        encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
      },
    });
    console.log("perfMBI", response);
    return response.data;
  } catch (error) {
    console.log("get Stats: error", error);
    return [];
  }
};
