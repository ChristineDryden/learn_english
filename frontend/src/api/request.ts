import axios, { type InternalAxiosRequestConfig } from "axios";
import { getStoredToken } from "../utils/auth";

const request = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 8000,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

request.interceptors.response.use((response) => response.data);

export default request;
