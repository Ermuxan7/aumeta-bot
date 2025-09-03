import { apiClient } from "@/lib/api-client";
import { VacancyPayload } from "@/types/vacancyType";

export const createVacancy = async (payload: VacancyPayload) => {
  const res = await apiClient.post("/vacancy/jobvacancy", payload);

  return res.data;
};
