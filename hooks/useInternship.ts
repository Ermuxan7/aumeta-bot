"use client";

import { createInternship } from "@/services/internship.service";
import { InternshipType } from "@/types/internshipType";
import { useMutation } from "@tanstack/react-query";

export const useCreateInternship = () => {
  return useMutation({
    mutationFn: (payload: InternshipType) => createInternship(payload),
  });
};
