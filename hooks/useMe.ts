"use client";
import { getMe, updateMe, UpdateUserPayload } from "@/services/user.service";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useMe() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    enabled: !!accessToken,
  });
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateMe(payload),
  });
};
