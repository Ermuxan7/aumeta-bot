export const getInitData = () => {
  if (typeof window === "undefined") return "";

  const tg = (window as any).Telegram?.WebApp;
  if (!tg) {
    console.warn("Telegram WebApp mavjud emas");
    return "";
  }

  tg.ready();

  const initData = tg.initData;
  if (!initData) {
    console.warn("InitData bo‘sh chiqdi");
    return "";
  }

  return initData;
};
