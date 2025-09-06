import { apiClient } from "@/lib/api-client";

export async function getMe() {
  const res = await apiClient.get("/user/me");
  return res.data;
}
