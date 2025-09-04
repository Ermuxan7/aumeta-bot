"use client";

import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { useEffect } from "react";
import Me from "./Me";

export default function TelegramAuth() {
  const authMutation = useTelegramAuth();

  useEffect(() => {
    console.log("useEffect ishladi ✅");

    const tg = (window as any).Telegram?.WebApp;
    console.log("TG:", tg);

    const initData = tg?.initData;
    console.log("INIT DATA:", initData);

    if (initData) {
      authMutation.mutate(initData);
    }
  }, []);

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
