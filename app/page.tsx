import { CalendarCheck2, FileText, Search, Trophy } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full text-white py-3 px-4 md:px-6">
      <div className="w-full max-w-5xl space-y-4">
        <h1 className="text-lg sm:text-xl text-foreground text-center mb-10">
          Aumeta Jobs kanallarına daǵaza jaylastırıw ushın tómendegi túymege
          basıń hám ondaǵı shablonlardı toltırıw arqalı kanalǵa jiberiń
        </h1>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/vacancy"
            className="flex flex-col items-center justify-center gap-3 text-md md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <Search className="size-8 lg:size-10" />
            </div>
            Hire / Vacancy
          </Link>
          <Link
            href="/internship"
            className="flex flex-col items-center justify-center gap-3 text-md md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <FileText className="size-8 lg:size-10" />
            </div>
            Internship
          </Link>
          <Link
            href="/project"
            className="flex flex-col items-center justify-center gap-3 text-sm md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <CalendarCheck2 className="size-8 lg:size-10" />
            </div>
            One-time Task/Project
          </Link>
          <Link
            href="/opportunities"
            className="flex flex-col items-center justify-center gap-3 text-sm md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <Trophy className="size-8 lg:size-10" />
            </div>
            Opportunities & Grants
          </Link>
        </div>
        <div className="w-full flex items-center justify-center gap-2 bg-yellow-100 rounded-md px-3 py-4 my-10 shadow-md">
          <img
            src="/attention.svg"
            alt="attention"
            className="size-6 md:size-8 "
          />
          <h2 className="text-sm sm:text-lg text-yellow-500 ">
            Daǵazalaw ushın mámleket saylanbaǵan. Profilge ótiń → mámleket
            saylań.
          </h2>
        </div>
        <div className="text-sm sm:text-md text-gray-500 text-center my-6">
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
