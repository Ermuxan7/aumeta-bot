import { apiClient } from "@/lib/api-client";
import { InternshipType } from "@/types/internshipType";

export const createInternship = async (payload: InternshipType) => {
  const res = await apiClient.post("/vacancy/internship/", payload);

  return res.data;
};

export const getInternship = async () => {
  const res = await apiClient.get("/vacancy/internship/mine");
  return res.data;
};

export const updateInternship = async (
  vacancyId: string,
  payload: InternshipType
) => {
  const res = await apiClient.put(`/vacancy/internship/${vacancyId}`, payload);
  return res.data;
};

export const deleteIdInternship = async (vacancyId: string) => {
  const res = await apiClient.delete(`/vacancy/internship/${vacancyId}`);
  return res.data;
};
