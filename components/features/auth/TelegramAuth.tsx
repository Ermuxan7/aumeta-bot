"use client";
import { useEffect, useState } from "react";
import { getInitData } from "@/lib/telegram";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";

export default function TelegramAuthPage() {
  const initData = getInitData();
  const { mutate, data: tokens, error, isPending } = useTelegramAuth(initData);

  useEffect(() => {
    if (initData) {
      mutate();
    }
  }, [initData, mutate]);

  if (error) {
    return (
      <div className="text-red-500 whitespace-pre-wrap">
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  if (isPending) return <div className="text-foreground">Loading...</div>;

  if (!tokens) return <div className="text-foreground">No tokens</div>;

  // return (
  //   <div>
  //     <p>{tokens.access_token}</p>
  //     <p>{tokens.refresh_token}</p>
  //   </div>
  // );
}
