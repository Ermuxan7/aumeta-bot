import { useEffect, useState } from "react";
import { useMe } from "./useMe";

// Define supported locales directly here
const locales = [
  "eng",
  "rus",
  "uzb",
  "kaz",
  "kaa",
  "kgz",
  "tjk",
  "aze",
  "tkm"
] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "kaa";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const { data: user } = useMe();

  useEffect(() => {
    console.log("User data:", user);
    if (user?.data?.language) {
      // Check if the user's language is supported
      const userLang = user.data.language.toLowerCase();
      console.log("User language from API:", userLang);
      const supportedLocale =
        locales.find((l) => l === userLang) || defaultLocale;
      console.log("Setting locale to:", supportedLocale);
      setLocale(supportedLocale);
    }
  }, [user]);

  return locale;
}
