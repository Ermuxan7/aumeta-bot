import { apiClient } from "@/lib/api-client";

export const createOpportunities = async (payload: FormData) => {
  const res = await apiClient.post("/vacancy/opportunities_grants/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
