import axios from "axios";
import { hostName } from "./config";

const axiosClient = axios.create({
  baseURL: hostName,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;
  return config;
});

export default axiosClient;
