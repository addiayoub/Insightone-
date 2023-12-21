import axios from "axios";
const apiUrl = "https://192.168.11.109:9090/";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb25zdW1lciIsImlhdCI6MTcwMzE0MzYyMywiZXhwIjoxNzAzMjMwMDIzfQ.CywrGsCzsoCm1bLoWl40ITsdk5sdlBNWz6kcvptpFwA";

const apiMarko = axios.create({
  baseURL: apiUrl,
  // withCredentials: true,
  responseType: "json",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  paramsSerializer: {
    indexes: null,
    encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
  },
});

apiMarko.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;

  return config;
});

export default apiMarko;
