"use client";
import { useEffect, useState } from "react";
import { setTokens } from "@/lib/auth";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";

export default function TelegramAuth() {
  const [initData, setInitData] = useState<string | null>(null);

  const {
    mutate: auth,
    data,
    isSuccess,
    isError,
    isPending,
    error,
  } = useTelegramAuth();

  useEffect(() => {
    // ✅ Telegram initData ni olish
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initData) {
      console.log("🔹 Telegram initData:", tg.initData);
      setInitData(tg.initData);
    } else {
      console.warn("⚠️ Telegram initData topilmadi");
    }

    // auth chaqirish
    auth();
  }, [auth]);

  useEffect(() => {
    if (isSuccess && data) {
      setTokens(data);
      console.log("✅ Auth muvaffaqiyatli:", data);
    }
  }, [isSuccess, data]);

  if (isPending) return <div className="text-foreground">Loading auth...</div>;
  if (isError) {
    console.error("❌ To‘liq xato:", error);

    const axiosErr = error as any;
    return (
      <div className="text-red-500 whitespace-pre-wrap">
        <p>
          <b>Xatolik:</b> {axiosErr.message}
        </p>
        {axiosErr.response && (
          <>
            <p>
              <b>Status:</b> {axiosErr.response.status}
            </p>
            <p>
              <b>Status text:</b> {axiosErr.response.statusText}
            </p>
            <p>
              <b>Detail:</b> {JSON.stringify(axiosErr.response.data, null, 2)}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold">InitData:</h2>
      <pre className="whitespace-pre-wrap break-all text-sm text-gray-600">
        {initData || "Yo‘q"}
      </pre>

      <h2 className="font-bold mt-4">Tokens:</h2>
      <p>{data?.access_token}</p>
      <p>{data?.refresh_token}</p>
    </div>
  );
}
