import { getIndustries } from "@/services/industry.service";
import { useQuery } from "@tanstack/react-query";

export const useIndustries = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  });
};
