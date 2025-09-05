import { useMutation } from "@tanstack/react-query";
import { getInitData } from "@/lib/telegram";
import { telegramAuth, Tokens } from "@/services/auth.service";

export const useTelegramAuth = () => {
  return useMutation<Tokens, Error>({
    mutationFn: async () => {
      const initData = getInitData();
      if (!initData) throw new Error("InitData topilmadi");

      return telegramAuth(initData);
    },
  });
};
