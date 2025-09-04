"use client";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { useEffect, useState } from "react";
import Me from "./Me";

export default function TelegramAuth() {
  const authMutation = useTelegramAuth();
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    if (!authMutation.isIdle) return;
    const tg = (window as any).Telegram?.WebApp;
    const data = tg?.initData || null;
    setInitData(data);

    if (data) {
      authMutation.mutate(data);
    }
  }, [authMutation]);

  if (authMutation.isPending)
    return <p className="text-foreground">Auth qilinyapti...</p>;
  if (authMutation.isError)
    return (
      <div>
        <p className="text-red-400">Xatolik: {String(authMutation.error)}</p>
        <p className="text-xs text-muted-foreground">
          initData: {initData ? "BOR ✅" : "YO‘Q 🚫"}
        </p>
      </div>
    );

  return (
    <div>
      <p className="text-xs text-muted-foreground">
        initData: {initData ? "BOR ✅" : "YO‘Q 🚫"}
      </p>

      {authMutation.isSuccess ? (
        <Me token={authMutation.data.access_token} />
      ) : (
        <p className="text-foreground">Telegram web arqali otin</p>
      )}
    </div>
  );
}
