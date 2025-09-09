import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await apiClient.get("/countries/");
      return res.data.data ?? [];
    },
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
  });
};
