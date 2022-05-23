import axios from "axios";
const { token } = JSON.parse(localStorage.getItem("persist:root") || "");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
