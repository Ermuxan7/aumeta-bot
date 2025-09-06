import { useMutation } from "@tanstack/react-query";
import { getInitData } from "@/lib/telegram";
import { telegramAuth, Tokens } from "@/services/auth.service";

export const useTelegramAuth = (initData: any) => {
  return useMutation<Tokens, Error>({
    mutationFn: async () => {
      if (!initData) throw new Error("InitData topilmadi");

      return telegramAuth(initData);
    },
  });
};
