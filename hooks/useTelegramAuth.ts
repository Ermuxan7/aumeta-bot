import { useMutation } from "@tanstack/react-query";
import { getInitData } from "@/lib/telegram";
import { telegramAuth, Tokens } from "@/services/auth.service";

export const useTelegramAuth = () => {
  return useMutation<Tokens, Error, string>({
    mutationFn: async (initData: string) => {
      if (!initData) throw new Error("InitData topilmadi");

      return telegramAuth(initData);
    },
  });
};
