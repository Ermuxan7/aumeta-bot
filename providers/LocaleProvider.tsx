"use client";

import { useLocale } from "@/hooks/useLocale";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";

const defaultLocale = "kaa";

interface LocaleProviderProps {
  children: React.ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const detectedLocale = useLocale();
  const [messages, setMessages] = useState<any>(null);
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const localeMessages = await import(`@/locales/${detectedLocale}.json`);
        setMessages(localeMessages.default);
        setLocale(detectedLocale);
      } catch (error) {
        // Fallback to default locale
        const defaultMessages = await import(`@/locales/${defaultLocale}.json`);
        setMessages(defaultMessages.default);
        setLocale(defaultLocale);
      }
    };

    loadMessages();
  }, [detectedLocale]);

  if (!messages) {
    return null; // or a loading spinner
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
