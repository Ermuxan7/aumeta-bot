import { apiClient } from "@/lib/api-client";
import { headers } from "next/headers";

export const createOpportunities = async (payload: FormData) => {
  const res = await apiClient.post("/vacancy/opportunities_grants/", payload, {
    headers: { Accept: "application/json" },
    maxBodyLength: Infinity,
  });
  return res.data;
};
