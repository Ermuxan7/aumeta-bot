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
  let token = useAuthStore.getState().accessToken;

  if (!token) {
    const saved = localStorage.getItem("auth-storage");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        token = parsed.state.access_token;
      } catch (error) {
        console.error("Failed to parse auth-storage from localStorage", error);
      }
    }
  }

  if (token && !config.url?.includes("/users/telegram/webapp/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
