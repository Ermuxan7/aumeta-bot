"use client";
import { useMyVacancies } from "@/hooks/useVacancy";
import { useMyInternships } from "@/hooks/useInternship";
import { useMyProjects } from "@/hooks/useProject";
import Link from "next/link";
import { MyPost } from "@/types/myPostType";
import { mapVacancy, mapInternship, mapOneTimeTask } from "@/lib/my-post";

export default function MyPosts() {
  const { data: vacanciesData, isLoading: vLoading } = useMyVacancies();
  const { data: internshipsData, isLoading: iLoading } = useMyInternships();
  const { data: oneTimeTasksData, isLoading: tLoading } = useMyProjects();

  if (vLoading || iLoading || tLoading) {
    return <p>Loading...</p>;
  }

  const allPosts: MyPost[] = [
    ...(vacanciesData?.data || []).map(mapVacancy),
    ...(internshipsData?.data || []).map(mapInternship),
    ...(oneTimeTasksData?.data || []).map(mapOneTimeTask),
  ];

  allPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (allPosts.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">Sizde postlar joq.</p>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-4">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        Meniń vakansiyalarım
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <Link
            key={`${post.form}-${post.id}`}
            href={`my-posts/${post.form.toLowerCase()}/${post.id}`}
            className="bg-muted rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-primary">{post.form}</p>
                <p className="text-lg sm:text-xl mt-3 font-bold break-words">
                  {post.lawazim}
                </p>
              </div>
              <div className="text-xs text-end">
                <p>{post.aymaq}</p>
                <p>{post.mekeme}</p>
              </div>
            </div>
            <p className="text-muted-foreground/80 text-xs mt-5">
              Posted on {post.createdAt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
