"use client";

import { getVacancies } from "@/services/vacancy.service";
import { useQuery } from "@tanstack/react-query";

export const useMyVacancies = () => {
  return useQuery({
    queryKey: ["my-vacancies"],
    queryFn: getVacancies,
  });
};
