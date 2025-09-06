export const getInitData = () => {
  if (typeof window === "undefined") return "";

  const tg = (window as any).Telegram?.WebApp;
  const initData = tg.initData;
  if (!initData) {
    console.warn("InitData bos");
    return "";
  }

  return initData;
};
