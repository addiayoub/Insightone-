import axios from "axios";
const apiUrl = "https://192.168.11.109:9090/";

const apiMarko = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  responseType: "json",
  paramsSerializer: {
    indexes: null,
    encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
  },
});

apiMarko.interceptors.request.use((config) => {
  const token = localStorage.getItem("apiToken");
  console.log("Token from", localStorage.getItem("apiToken"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = `application/json`;

  return config;
});

export default apiMarko;
