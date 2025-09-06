import { useMutation } from "@tanstack/react-query";
import { getInitData } from "@/lib/telegram";
import { telegramAuth, Tokens } from "@/services/auth.service";
import { setTokens } from "@/lib/auth";

export const useTelegramAuth = (initData: any) => {
  return useMutation<Tokens, Error>({
    mutationFn: async () => {
      if (!initData) throw new Error("InitData not found!");

      const tokens = await telegramAuth(initData);
      setTokens(tokens);
      return tokens;
    },
  });
};
