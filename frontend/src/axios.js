import axios from "axios";
import { hostName } from "./config";

const axiosClient = axios.create({
  baseURL: hostName,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;
  config.headers["Access-Control-Allow-Methods"] =
    "GET, POST, OPTIONS, PUT, DELETE";
  return config;
});

export default axiosClient;
