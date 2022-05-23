import axios from "axios";
import { getToken } from "../auth";
const token = getToken();

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
