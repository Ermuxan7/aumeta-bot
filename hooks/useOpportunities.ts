import { createOpportunities } from "@/services/opportunities.service";
import { useMutation } from "@tanstack/react-query";

export const useOpportunities = () => {
  return useMutation({
    mutationFn: (payload: FormData) => createOpportunities(payload),
  });
};
