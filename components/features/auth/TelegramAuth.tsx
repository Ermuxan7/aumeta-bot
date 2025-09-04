"use client";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { useEffect } from "react";
import Me from "./Me";

export default function TelegramAuth() {
  const authMutation = useTelegramAuth();

  useEffect(() => {
    if (!authMutation.isIdle) return;
    const tg = (window as any).Telegram?.WebApp;
    const initData = tg?.initData;
    if (initData) {
      authMutation.mutate(initData);
    }
  }, [authMutation]);

  if (authMutation.isPending)
    return <p className="text-foreground">Auth qilinyapti...</p>;
  if (authMutation.isError)
    return (
      <p className="text-red-400">Xatolik: {String(authMutation.error)}</p>
    );

  return (
    <div>
      {authMutation.isSuccess ? (
        <Me token={authMutation.data.access_token} />
      ) : (
        <p className="text-foreground">Telegram web arqali otin</p>
      )}
    </div>
  );
}
