import { apiClient } from "@/lib/api-client";

export const createOpportunities = async (payload: FormData) => {
  const res = await apiClient.post("/vacancy/opportunities_grants/", payload);
  return res.data;
};
