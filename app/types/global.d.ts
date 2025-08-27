export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        colorScheme: "light" | "dark";
        themeParams: Record<string, string>;
      };
    };
  }
}
