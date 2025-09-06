import axios from "axios";
import { getAccessToken } from "./auth";
import { useAuthStore } from "@/store/authStore";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && !config.url?.includes("/users/telegram/webapp/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
