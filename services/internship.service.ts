import { apiClient } from "@/lib/api-client";
import { InternshipType } from "@/types/internshipType";

export const createInternship = async (payload: InternshipType) => {
  const res = await apiClient.post("/vacancy/internship/", payload);

  return res.data;
};
