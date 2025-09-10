import { apiClient } from "@/lib/api-client";
import { ProjectType } from "@/types/projectType";

export const createProject = async (payload: ProjectType) => {
  const res = await apiClient.post("/vacancy/one_time_task/", payload);
  return res.data;
};

export const getProjects = async () => {
  const res = await apiClient.get("/vacancy/one_time_task/mine");
  return res.data;
};

export const updateProject = async (
  vacancyId: string,
  payload: ProjectType
) => {
  const res = await apiClient.put(
    `/vacancy/one_time_task/${vacancyId}`,
    payload
  );

  return res.data;
};

export const deleteProject = async (vacancyId: string) => {
  const res = await apiClient.delete(`/vacancy/one_time_task/${vacancyId}`);
  return res.data;
};
