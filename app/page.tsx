"use client";
import TelegramAuth from "@/components/features/auth/TelegramAuth";
import { useMe } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import AttentionPNG from "@/public/attention.png";
import InternshipSVG from "@/public/internship.svg";
import OpportunitiesSVG from "@/public/opportunities.svg";
import ProjectSVG from "@/public/project.svg";
import VacancySVG from "@/public/vacancy.svg";

const getCards = (t: any) => {
  const cards = t.raw("cards") || [];
  return [
    {
      title: cards[0] || "Vacancy",
      img: (
        <Image
          src={VacancySVG}
          className="size-14 md:size-22"
          alt="vacancy page button image"
          width={56}
          height={56}
        />
      ),
      href: "/vacancy"
    },
    {
      title: cards[1] || "Internship",
      img: (
        <Image
          src={InternshipSVG}
          className="size-14 md:size-22"
          alt="internship page button image"
          width={56}
          height={56}
        />
      ),
      href: "/internship"
    },
    {
      title: cards[2] || "Project",
      img: (
        <Image
          src={ProjectSVG}
          className="size-14 md:size-22"
          alt="project page button image"
          width={56}
          height={56}
        />
      ),
      href: "/project"
    },
    {
      title: cards[3] || "Opportunities",
      img: (
        <Image
          src={OpportunitiesSVG}
          className="size-14 md:size-22"
          alt="opportunities page button image"
          width={56}
          height={56}
        />
      ),
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
      <div className="w-full max-w-7xl flex flex-col justify-center items-center gap-12">
        <div className="flex flex-col justify-center items-center">
          <TelegramAuth />
          <h1 className="text-lg sm:text-xl font-normal tracking-tight text-foreground leading-5 text-center">
            {t("posting_instruction")}
          </h1>
        </div>
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
        <div>
          {countryId === null && (
            <div className="w-full h-18 flex items-center justify-center gap-2 bg-primary rounded-md px-3 py-4 my-6 shadow-md">
              <>
                <Image
                  src={AttentionPNG}
                  alt="attention icon"
                  className="size-6 md:size-8 "
                  width={24}
                  height={24}
                />
                <p className="text-sm sm:text-lg text-primary-foreground font-semibold">
                  {t("country_not_selected_error")}
                </p>
              </>
            </div>
          )}
          <div className="text-base text-muted-foreground text-center font-normal mb-4">
            <p className="text-base text-primary-foreground font-normal">
              🌐 {t("publication_country")}: {me?.data?.location?.country?.name}
            </p>
            <p>
              ❕{t("ads_are_free")} <br />
            </p>
            <p>
              📩 {t("question_contact")}{" "}
              <Link className="text-blue-500" href="https://t.me/bizlergroup">
                @bizlergroup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
