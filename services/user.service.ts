import { apiClient } from "@/lib/api-client";

export interface UpdateUserPayload {
  language_code: string;
  full_name: string;
  contact: string;
  company_name: string;
  country_id: number | null;
  region_id: number | null;
}

export async function getMe() {
  const res = await apiClient.get("/users/me");
  return res.data;
}

export const updateMe = async (payload: UpdateUserPayload) => {
  const res = await apiClient.put("/users/me", payload);
  return res.data;
};
