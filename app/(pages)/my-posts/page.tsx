"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/ui/back-button";
import Link from "next/link";

type Vacancy = {
  id: string;
  aymaq: string;
  lawazim: string;
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
        mekeme: "Bizler Group",
        createdAt: "2025-08-25",
      },
      {
        id: "2",
        aymaq: "Samarqand",
        lawazim: "Menejer",
        mekeme: "ООО Ромашка",
        createdAt: "2025-08-24",
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-6 md:px-8">
      <BackButton />
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {vacancy.lawazim}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {vacancy.mekeme} — {vacancy.aymaq}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Posted on {vacancy.createdAt}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Link
                  href={`/my-posts/edit/${vacancy.id}`}
                  className="px-3 py-1 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </Link>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
