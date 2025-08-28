import { CalendarCheck2, FileText, Search, Trophy } from "lucide-react";
import Link from "next/link";

const Cards = [
  {
    title: "Jumısshı kerek(Vakansiya)",
    icon: <Search className="size-8 lg:size-10" />,
    href: "/vacancy",
  },
  {
    title: "Ámeliyat",
    icon: <FileText className="size-8 lg:size-10" />,
    href: "/internship",
  },
  {
    title: "Bir mártelik wazıypa/joybar",
    icon: <CalendarCheck2 className="size-8 lg:size-10" />,
    href: "/project",
  },
  {
    title: "Imkaniyatlar & grantlar",
    icon: <Trophy className="size-8 lg:size-10" />,
    href: "/opportunities",
  },
];

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full text-background py-3 px-4 md:px-6">
      <div className="w-full max-w-5xl space-y-4">
        <h1 className="text-lg sm:text-xl text-foreground text-center mb-10">
          Aumeta Jobs kanallarına daǵaza jaylastırıw ushın tómendegi túymege
          basıń hám ondaǵı shablonlardı toltırıp kanalǵa jiberiń
        </h1>
        <div className="grid grid-cols-2 gap-3">
          {Cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="flex flex-col items-center justify-center gap-4 text-sm md:text-lg lg:text-xl text-primary-foreground bg-muted hover:bg-muted/80 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center justify-center text-primary bg-primary/10 rounded-full p-3 lg:p-5">
                {card.icon}
              </div>
              <h3 className="text-primary text-sm font-medium h-10 text-center">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="w-full flex items-center justify-center gap-2 bg-attention-bg rounded-md px-3 py-4 my-10 shadow-md">
          <img
            src="/attention.svg"
            alt="attention"
            className="size-6 md:size-8 "
          />
          <p className="text-sm sm:text-lg text-attention-text font-medium">
            Daǵazalaw ushın mámleket saylanbaǵan. Profilge ótiń → mámleket
            saylań.
          </p>
        </div>
        <div className="text-sm sm:text-md text-muted-foreground text-center my-6">
          <p>
            ❕ Daǵazalaw biypul. Aldawshılardan abaylań. <br />
            📩 Soraw hám usınıslar:{" "}
            <Link href="https://t.me/bizlergroup">@bizlergroup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
