"use client";

import {
  createInternship,
  getInternship,
  updateInternship,
} from "@/services/internship.service";
import { InternshipType } from "@/types/internshipType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateInternship = () => {
  return useMutation({
    mutationFn: (payload: InternshipType) => createInternship(payload),
  });
};

export const useMyInternships = () => {
  return useQuery({
    queryKey: ["my-internships"],
    queryFn: getInternship,
  });
};

export const useIdInternship = (vacancyId: string) => {
  return useMutation({
    mutationFn: (payload: InternshipType) =>
      updateInternship(vacancyId, payload),
  });
};
