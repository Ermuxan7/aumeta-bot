import { apiClient } from "@/lib/api-client";

export async function getMe(token: string) {
  const res = await apiClient.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
