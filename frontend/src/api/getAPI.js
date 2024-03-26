import axios from "axios";
import { apiLogs, handleError, handleResponse } from "../utils/apiLogs";
const apiUrl = "https://192.168.11.109:9090/";

const getAPI = axios.create({
  baseURL: apiUrl,
  // withCredentials: true,
  responseType: "json",
  paramsSerializer: {
    indexes: null,
    encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
  },
});

getAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("apiToken");
  console.log(
    "Token from",
    localStorage.getItem("apiToken") ? "EXIST" : "NOT EXISTS"
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.metadata = { startTime: new Date(), type: "GETAPI" };
  config.headers.Accept = `application/json`;
  console.log("request config", config);

  return config;
});

getAPI.interceptors.response.use(
  async function (response) {
    // await handleResponse(response);
    return response;
  },
  async function (error) {
    await handleError(error);
    return Promise.reject(error);
  }
);

export default getAPI;
