import { CalendarCheck2, FileText, Search, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full text-white py-3 px-4 md:px-6">
      <div className="w-full max-w-7xl space-y-4">
        <h1 className="text-2xl sm:text-3xl text-foreground">Home</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            className="flex flex-col items-center justify-center gap-3 text-md md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <CalendarCheck2 className="size-8 lg:size-10" />
            </div>
            One-time Task/Project
          </Link>
          <Link
            href="/opportunities"
            className="flex flex-col items-center justify-center gap-3 text-md md:text-lg lg:text-xl text-blue-700 bg-gray-300 hover:bg-gray-400/70 min-h-40 md:min-h-60 xl:min-h-80 p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center justify-center bg-gray-400/40 rounded-full p-3 lg:p-5">
              <Trophy className="size-8 lg:size-10" />
            </div>
            Opportunities & Grants
          </Link>
        </div>
      </div>
    </div>
  );
}
