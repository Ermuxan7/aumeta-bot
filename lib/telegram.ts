export const getInitData = () => {
  if (typeof window !== "undefined" && window.Telegram.WebApp) {
    return window.Telegram.WebApp.initData;
  }

  return null;
};
