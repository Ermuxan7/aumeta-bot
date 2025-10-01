import { apiClient } from "@/lib/api-client";
export interface UpdateUserPayload {
  full_name: string;
  contact: string;
  company_name: string;
  country_id: number | null;
  region_id: number | null;
  language_code: string;
}

export async function getMe() {
  const res = await apiClient.get("/users/me");
  // confirm(JSON.stringify(res.data));
  return res.data;
}

export const updateMe = async (payload: UpdateUserPayload) => {
  // confirm(JSON.stringify(payload));
  const res = await apiClient.put("/users/me", payload);
  return res.data;
};
