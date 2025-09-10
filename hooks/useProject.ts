"use client";

import {
  createProject,
  getProjects,
  updateProject,
} from "@/services/project.service";
import { ProjectType } from "@/types/projectType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (payload: ProjectType) => createProject(payload),
  });
};

export const useMyProjects = () => {
  return useQuery({
    queryKey: ["my-projects"],
    queryFn: getProjects,
  });
};

export const useIdProject = (vacancyId: string) => {
  return useMutation({
    mutationFn: (payload: ProjectType) => updateProject(vacancyId, payload),
  });
};
