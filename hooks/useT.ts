import { useTranslations } from "next-intl";

// Simple hook to use translations
export function useT() {
  return useTranslations();
}

// For the future, you can extend this to have more specific translation functions
// For example:
// export function useCommonTranslations() {
//   return useTranslations('common');
// }
