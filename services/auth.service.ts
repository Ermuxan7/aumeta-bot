import { apiClient } from "@/lib/api-client";

export type Tokens = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
};

export const telegramAuth = async (initData: string): Promise<Tokens> => {
  const res = await apiClient.post("/users/telegram/webapp/auth", {
    init_data: initData,
  });
  return res.data as Tokens;
};
