import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { getInitData } from "@/lib/telegram";

type Tokens = {
  access_token: string;
  refresh_token: string;
};

export const useTelegramAuth = () => {
  return useMutation<Tokens, Error>({
    mutationFn: async () => {
      const initData = getInitData();
      if (!initData) throw new Error("InitData topilmadi");

      const res = await apiClient.post("/users/telegram/webapp/auth", {
        initData,
      });
      return res.data as Tokens;
    },
  });
};
