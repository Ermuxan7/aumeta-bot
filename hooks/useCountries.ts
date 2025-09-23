import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await apiClient.get("/countries/");
      return res.data.data ?? [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  });
};

export const useRegions = (countryId: number | null) => {
  return useQuery({
    queryKey: ["regions", countryId],
    queryFn: async () => {
      if (!countryId) return [];
      const res = await apiClient.get(`/countries/${countryId}`);
      return res.data.data?.regions ?? [];
    },
    enabled: !!countryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
};
