"use client";

import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { useEffect } from "react";

export default function TelegramAuth() {
  const authMutation = useTelegramAuth();

  useEffect(() => {
    console.log("useEffect ishladi ✅");

    const tg = (window as any).Telegram?.WebApp;
    console.log("TG:", tg);

    const initData = tg?.initData ?? process.env.NEXT_PUBLIC_FAKE_INIT_DATA;
    console.log("INIT DATA:", initData);

    if (initData) {
      authMutation.mutate(initData);
    }
  }, []);

  //   if (authMutation.isLoading) return <p>Auth qilinyapti...</p>;
  if (authMutation.isError) return <p>Xatolik: {String(authMutation.error)}</p>;

  return (
    <div>
      {authMutation.isSuccess ? (
        <pre>{JSON.stringify(authMutation.data, null, 2)}</pre>
      ) : (
        <p className="text-foreground">
          Telegram orqali avtorizatsiya qilinmoqda...
        </p>
      )}
    </div>
  );
}
