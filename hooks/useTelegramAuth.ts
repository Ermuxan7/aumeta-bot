"use client";

import { telegramAuth } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useTelegramAuth = () => {
  return useMutation({
    mutationFn: (initData: string) => telegramAuth(initData),
  });
};
