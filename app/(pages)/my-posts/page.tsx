"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Vacancy = {
  id: string;
  aymaq: string;
  lawazim: string;
  category: string;
  mekeme: string;
  createdAt: string;
  form: "Vacancy" | "Internship" | "One-time Task" | "Opportunities";
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
        form: "Internship",
      },
      {
        id: "2",
        aymaq: "Samarqand",
        lawazim: "Menejer",
        category: "Marketing",
        mekeme: "ООО Ромашка",
        createdAt: "2025-08-24",
        form: "One-time Task",
      },
      {
        id: "3",
        aymaq: "Nawayı",
        lawazim: "Esapshı",
        category: "Finance",
        mekeme: "Delivery Express",
        createdAt: "2025-08-23",
        form: "Opportunities",
      },
      {
        id: "4",
        aymaq: "Xorezm",
        lawazim: "Developer",
        category: "IT",
        mekeme: "Tech Solutions",
        createdAt: "2025-08-22",
        form: "Vacancy",
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-2 px-4 sm:px-6 md:px-8">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        Meniń vakansiyalarım
      </h2>
      {vacancies.length !== 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {vacancies.map((vacancy) => (
            <Link
              href={`my-posts/${vacancy.id}`}
              key={vacancy.id}
              className="bg-muted rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-primary">{vacancy.form}</p>
                  <p className="text-xl mt-3 font-bold">{vacancy.lawazim}</p>
                </div>
                <div className="text-xs text-end">
                  <p className="text-xs">{vacancy.aymaq}</p>
                  <p className="">{vacancy.mekeme}</p>
                </div>
              </div>
              <p className="text-muted-foreground/80 text-xs mt-5">
                Posted on {vacancy.createdAt}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Sizde postlar joq.</p>
      )}
    </div>
  );
};

export default MyPosts;
