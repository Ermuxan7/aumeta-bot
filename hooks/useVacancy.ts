"use client";
import { createVacancy, getIdVacancy, getVacancies } from "@/services/vacancy.service";
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
  return useQuery({
    queryKey: ["id-vacancy", vacancyId],
    queryFn: () => getIdVacancy(vacancyId),
    enabled: !!vacancyId,
  });
};
