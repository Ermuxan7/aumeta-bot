"use client";
import TelegramAuth from "@/components/features/auth/TelegramAuth";
import { useMe } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import Link from "next/link";
import { useEffect } from "react";

const getCards = (t: any) => {
  const cards = t.raw("cards") || [];
  return [
    {
      title: cards[0] || "Vacancy",
      img: <img src="/vacancy.svg" className="size-14 md:size-22" />,
      href: "/vacancy"
    },
    {
      title: cards[1] || "Internship",
      img: <img src="/internship.svg" className="size-14 md:size-22" />,
      href: "/internship"
    },
    {
      title: cards[2] || "Project",
      img: <img src="/project.svg" className="size-14 md:size-22" />,
      href: "/project"
    },
    {
      title: cards[3] || "Opportunities",
      img: <img src="/opportunities.svg" className="size-14 md:size-22" />,
      href: "/opportunities"
    }
  ];
};

export default function Home() {
  const { data: me } = useMe();
  const { countryId, regionId, setLocation } = useLocationStore();
  const t = useT();

  useEffect(() => {
    if (me?.data && (countryId === null || regionId === null)) {
      const apiCountry = me.data.location?.country?.id ?? null;
      const apiRegion = me.data.location?.region?.id ?? null;

      if (apiCountry !== null && apiRegion !== null) {
        setLocation(apiCountry, apiRegion);
      }
    }
  }, [me, countryId, regionId, setLocation]);

  return (
    <div className="flex justify-center items-center w-full text-background py-3 px-4 md:px-6">
      <div className="w-full max-w-7xl flex flex-col justify-center items-center">
        <TelegramAuth />
        <h1 className="text-lg sm:text-xl font-normal tracking-tight text-foreground leading-5 text-center mb-6 sm:mb-8">
          {t("posting_instruction")}
        </h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-x-5 sm:gap-y-6 w-full">
          {getCards(t).map((card, index) => (
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
        {countryId === null && (
          <div className="w-full h-18 flex items-center justify-center gap-2 bg-primary rounded-md px-3 py-4 my-6 shadow-md">
            <img
              src="/attention.png"
              alt="attention"
              className="size-6 md:size-8 "
            />
            <p className="text-sm sm:text-lg text-primary-foreground font-semibold">
              {t("country_not_selected_error")}
            </p>
          </div>
        )}
        <div className="text-sm sm:text-md text-muted-foreground text-center font-normal mt-6 sm:my-8">
          <p>
            ❕ {t("ads_are_free")} <br />
          </p>
          <p>
            📩 {t("question_contact")}{" "}
            <Link href="https://t.me/bizlergroup">@bizlergroup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
