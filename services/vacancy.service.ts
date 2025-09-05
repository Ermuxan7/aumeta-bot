import { apiClient } from "@/lib/api-client";
import { VacancyPayload } from "@/types/vacancyType";

export const createVacancy = async (payload: VacancyPayload) => {
  const res = await apiClient.post("/vacancy/jobvacancy", payload);

  return res.data;
};

export const getVacancies = async () => {
  const res = await apiClient.get("/vacancy/jobvacancy/mine");

  return res.data;
};

export const getIdVacancy = async (vacancyId: string) => {
  const res = await apiClient.put(`/vacancy/jobvacancy/${vacancyId}`);
  return res.data;
};

export const deleteIdVacancy = async (vacancyId: string) => {
  const res = await apiClient.delete(`/vacancy/jobvacancy/${vacancyId}`);
  return res.data;
};
