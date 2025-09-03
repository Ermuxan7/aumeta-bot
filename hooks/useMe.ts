"use client";

import { getMe } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useMe(token?: string) {
  return useQuery({
    queryKey: ["me", token],
    queryFn: () => {
      if (!token) throw new Error("Token is required");
      return getMe(token);
    },
    enabled: !!token,
  });
}
