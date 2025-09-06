import { useMutation } from "@tanstack/react-query";
import { telegramAuth, Tokens } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

export const useTelegramAuth = (initData: any) => {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation<Tokens, Error>({
    mutationFn: async () => {
      if (!initData) throw new Error("InitData not found!");

      const tokens = await telegramAuth(initData);
      setTokens(tokens.access_token, tokens.refresh_token);
      return tokens;
    },
  });
};
