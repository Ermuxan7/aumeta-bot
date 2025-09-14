import {
  createOpportunities,
  deleteIdOpportunities,
  getMyOpportunities,
  updateIdOpportunities,
} from "@/services/opportunities.service";
import { OpportunityPayload } from "@/types/opportunitiesType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOpportunities = () => {
  return useMutation({
    mutationFn: (payload: FormData) => createOpportunities(payload),
  });
};

export const useMyOpportunities = () => {
  return useQuery({
    queryKey: ["my-opportunities"],
    queryFn: () => getMyOpportunities(),
  });
};

export const useUpdateOpportunity = (vacancyId: string) => {
  return useMutation({
    mutationFn: (payload: FormData) =>
      updateIdOpportunities(vacancyId, payload),
  });
};

export const useDeleteOpportunity = () => {
  return useMutation({
    mutationFn: (id: string) => deleteIdOpportunities(id),
  });
};
