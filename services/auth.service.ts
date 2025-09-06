import { apiClient } from "@/lib/api-client";
import { headers } from "next/headers";

export type Tokens = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
};

export const telegramAuth = async (initData: string): Promise<Tokens> => {
  const res = await apiClient.post(
    "/users/telegram/webapp/auth",
    new URLSearchParams({ init_data: initData }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data as Tokens;
};
