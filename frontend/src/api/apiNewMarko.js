import axios from "axios";
import { handleError, handleResponse } from "../utils/apiLogs";
const apiUrl = "http://192.168.11.2:30000/BACKTEST/";
// const apiUrl = "http://192.168.11.104:30000/BACKTEST/";

const apiNewMarko = axios.create({
  baseURL: apiUrl,
  // withCredentials: true,
  responseType: "json",
  paramsSerializer: {
    indexes: null,
    encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
  },
});

apiNewMarko.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.metadata = { startTime: new Date(), type: "FASTAPI" };
  console.log("config", config);
  return config;
});
apiNewMarko.interceptors.response.use(
  async function (response) {
    console.log("interceptors.response", response, response.config.metadata);
    // await handleResponse(response);
    return response;
  },
  async function (error) {
    console.log("interceptors.error", error, error.config.metadata);
    // await handleError(error);
    return Promise.reject(error);
  }
);
export default apiNewMarko;
