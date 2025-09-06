"use client";
import { useEffect } from "react";
import { setTokens } from "@/lib/auth";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";
import { getInitData } from "@/lib/telegram";

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
    const initData = getInitData();
    if (initData) {
      auth(initData); // backendga yuboriladi
    } else {
      console.warn("InitData yo‘q");
    }
  }, []);

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
      <p>{data?.access_token}</p>
      <p>{data?.refresh_token}</p>
    </div>
  );
}
