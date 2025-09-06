"use client";
import {
  createVacancy,
  getVacancies,
  updateVacancy,
} from "@/services/vacancy.service";
import { VacancyPayload } from "@/types/vacancyType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateVacancy = () => {
  return useMutation({
    mutationFn: (payload: VacancyPayload) => createVacancy(payload),
  });
};

export const useMyVacancies = () => {
  return useQuery({
    queryKey: ["my-vacancies"],
    queryFn: getVacancies,
  });
};

export const useIdVacancy = (vacancyId: string) => {
  return useMutation({
    mutationFn: (payload: VacancyPayload) => updateVacancy(vacancyId, payload),
  });
};
