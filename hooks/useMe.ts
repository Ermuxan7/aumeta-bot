"use client";
import { getMe } from "@/services/user.service";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    enabled: !!accessToken,
  });
}
