import Link from "next/link";
import TelegramAuth from "@/components/features/auth/TelegramAuth";
import { useEffect, useState } from "react";
const Cards = [
  {
    title: "Jumısshı kerek(Vakansiya)",
    img: <img src="/vacancy.svg" className="size-14 md:size-22" />,
    href: "/vacancy",
  },
  {
    title: "Ámeliyat",
    img: <img src="/internship.svg" className="size-14 md:size-22" />,
    href: "/internship",
  },
  {
    title: "Bir mártelik wazıypa/joybar",
    img: <img src="/project.svg" className="size-14 md:size-22" />,
    href: "/project",
  },
  {
    title: "Imkaniyatlar & grantlar",
    img: <img src="/opportunities.svg" className="size-14 md:size-22" />,
    href: "/opportunities",
  },
];

export default function Home() {
  const [initData, setInitData] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        setInitData(tg.initData);
        setName(tg.initDataUnsafe?.user?.first_name || null);
      }
    }
  }, []);
  return (
    <div className="flex justify-center items-center w-full text-background py-3 px-4 md:px-6">
      <div className="w-full max-w-7xl flex flex-col justify-center items-center">
        {initData && (
          <div className="w-full mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm text-center">
            <p>Telegramdan muvaffaqiyatli kirildi!</p>
            <p>{name}</p>
            <TelegramAuth initData={initData} />
          </div>
        )}
        <h1 className="text-lg sm:text-xl font-normal tracking-tight text-foreground leading-5 text-center mb-6 sm:mb-8">
          Aumeta Jobs kanallarına daǵaza jaylastırıw ushın tómendegi túymege
          basıń hám ondaǵı shablonlardı toltırıp kanalǵa jiberiń
        </h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-x-5 sm:gap-y-6 w-full">
          {Cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="flex flex-col items-center justify-center gap-3 text-sm md:text-lg lg:text-xl text-primary-foreground bg-muted hover:bg-muted/80 min-h-38 md:min-h-60 xl:min-h-80 p-2 rounded-lg shadow-md transition-all duration-200 ease-in-out"
            >
              {card.img}
              <h3 className="text-foreground text-sm font-semibold h-10 text-center">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="w-full h-18 flex items-center justify-center gap-2 bg-primary rounded-md px-3 py-4 my-6 shadow-md">
          <img
            src="/attention.png"
            alt="attention"
            className="size-6 md:size-8 "
          />
          <p className="text-sm sm:text-lg text-primary-foreground font-semibold">
            Daǵazalaw ushın mámleket saylanbaǵan. Profilge ótiń → mámleket
            saylań.
          </p>
        </div>
        <div className="text-sm sm:text-md text-muted-foreground text-center font-normal sm:my-8">
          <p>
            ❕ Daǵazalaw biypul. Aldawshılardan abaylań. <br />
          </p>
          <p>
            📩 Soraw hám usınıslar:{" "}
            <Link href="https://t.me/bizlergroup">@bizlergroup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
