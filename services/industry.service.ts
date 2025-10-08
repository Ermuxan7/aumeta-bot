import { apiClient } from "@/lib/api-client";

export async function getIndustries() {
  const res = await apiClient.get("/industry/");
  return res.data.data ?? [];
}
