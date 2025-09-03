"use client";

import { createVacancy } from "@/services/vacancy.service";
import { VacancyPayload } from "@/types/vacancyType";
import { useMutation } from "@tanstack/react-query";

export const useCreateVacancy = () => {
  return useMutation({
    mutationFn: (payload: VacancyPayload) => createVacancy(payload),
  });
};
