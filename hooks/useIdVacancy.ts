"use client";

import { getIdVacancy } from "@/services/vacancy.service";
import { useQuery } from "@tanstack/react-query";

export const useIdVacancy = (vacancyId: string) => {
  return useQuery({
    queryKey: ["id-vacancy", vacancyId],
    queryFn: () => getIdVacancy(vacancyId),
    enabled: !!vacancyId,
  });
};
