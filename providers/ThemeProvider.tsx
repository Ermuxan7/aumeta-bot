"use client";
import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp as any;

      const applyTheme = () => {
        if (tg.colorScheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

      applyTheme();
      tg.onEvent("themeChanged", applyTheme);

      return () => {
        tg.offEvent("themeChanged", applyTheme);
      };
    }
  }, []);

  return null;
}
