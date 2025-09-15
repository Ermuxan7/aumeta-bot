import { apiClient } from "@/lib/api-client";

export const getLanguages = async () => {
  const res = await apiClient.get("/languages/");
  return res.data;
};
