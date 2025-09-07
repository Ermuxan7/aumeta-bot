import { apiClient } from "@/lib/api-client";

export async function getMe() {
  const res = await apiClient.get("/users/me");
  return res.data;
}
