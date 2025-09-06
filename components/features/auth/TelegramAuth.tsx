"use client";
import { useEffect, useState } from "react";
import { getInitData } from "@/lib/telegram";
import { telegramAuth, Tokens } from "@/services/auth.service";
import { setTokens } from "@/lib/auth";

export default function TelegramAuthPage() {
  const [tokens, setTokensState] = useState<Tokens | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const initData = getInitData();
    if (!initData) {
      setError("InitData tabilmadi");
      return;
    }

    telegramAuth(initData)
      .then((data) => {
        setTokens(data);
        setTokensState(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div className="text-red-500 whitespace-pre-wrap">
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  if (!tokens) return <div>Loading...</div>;

  return (
    <div>
      <p>{tokens.access_token}</p>
      <p>{tokens.refresh_token}</p>
    </div>
  );
}
