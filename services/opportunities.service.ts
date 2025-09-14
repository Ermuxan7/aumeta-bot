import { apiClient } from "@/lib/api-client";
import { OpportunityPayload } from "@/types/opportunitiesType";

export const createOpportunities = async (payload: FormData) => {
  const res = await apiClient.post("/vacancy/opportunities_grants/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    maxBodyLength: Infinity,
  });

  return res.data;
};

export const getMyOpportunities = async () => {
  const res = await apiClient.get("/vacancy/opportunities_grants/mine");
  return res.data;
};

export const updateIdOpportunities = async (
  vacancyId: string,
  payload: FormData
) => {
  const res = await apiClient.put(
    `/vacancy/opportunities_grants/${vacancyId}`,
    payload,
    {
      maxBodyLength: Infinity,
    }
  );

  return res.data;
};

export const deleteIdOpportunities = async (vacancyId: string) => {
  const res = await apiClient.delete(
    `/vacancy/opportunities_grants/${vacancyId}`
  );
  return res.data;
};
