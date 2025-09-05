"use client";
import { useEffect } from "react";
import { setTokens } from "@/lib/auth";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";

export default function TelegramAuth() {
  const {
    mutate: auth,
    data,
    isSuccess,
    isError,
    isPending,
    error,
  } = useTelegramAuth();

  useEffect(() => {
    auth();
  }, [auth]);

  useEffect(() => {
    if (isSuccess && data) {
      setTokens(data);
      console.log("Auth muvaffaqiyatli:", data);
    }
  }, [isSuccess, data]);

  if (isPending) return <div className="text-foreground">Loading auth...</div>;
  if (isError)
    return <div className="text-red-500">Xatolik: {error.message}</div>;

  return (
    <div>
      <p>{data?.access_token}</p>
      <p>{data?.refresh_token}</p>
    </div>
  );
}
