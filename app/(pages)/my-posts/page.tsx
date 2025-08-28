"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/ui/back-button";
import Link from "next/link";

type Vacancy = {
  id: string;
  aymaq: string;
  lawazim: string;
  category: string;
  mekeme: string;
  createdAt: string;
};

const MyPosts = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    setVacancies([
      {
        id: "1",
        aymaq: "Tashkent",
        lawazim: "Dizayner",
        category: "Design",
        mekeme: "Bizler Group",
        createdAt: "2025-08-25",
      },
      {
        id: "2",
        aymaq: "Samarqand",
        lawazim: "Menejer",
        category: "Marketing",
        mekeme: "ООО Ромашка",
        createdAt: "2025-08-24",
      },
      {
        id: "3",
        aymaq: "Nawayı",
        lawazim: "Esapshı",
        category: "Finance",
        mekeme: "Delivery Express",
        createdAt: "2025-08-23",
      },
      {
        id: "4",
        aymaq: "Xorezm",
        lawazim: "Developer",
        category: "IT",
        mekeme: "Tech Solutions",
        createdAt: "2025-08-22",
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-6 md:px-8">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        My Vacancies
      </h2>

      {vacancies.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You haven't posted any vacancies yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {vacancies.map((vacancy) => (
            <Link
              href={`my-posts/${vacancy.id}`}
              key={vacancy.id}
              className="bg-card/90 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {vacancy.lawazim}
                  </h3>
                  <p className="px-2 py-1 rounded-md text-sm bg-primary/10 text-primary font-medium">
                    {vacancy.category}
                  </p>
                </div>
                <p className="text-muted-foreground mt-1">
                  {vacancy.mekeme} — {vacancy.aymaq}
                </p>
                <p className="text-muted-foreground/80 text-sm mt-2">
                  Posted on {vacancy.createdAt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
