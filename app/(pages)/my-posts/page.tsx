"use client";
import { useMyInternships } from "@/hooks/useInternship";
import { useMyOpportunities } from "@/hooks/useOpportunities";
import { useMyProjects } from "@/hooks/useProject";
import { useT } from "@/hooks/useT";
import { useMyVacancies } from "@/hooks/useVacancy";
import {
  mapInternship,
  mapOneTimeTask,
  mapOpportunities,
  mapVacancy
} from "@/lib/my-post";
import { MyPost } from "@/types/myPostType";
import Link from "next/link";

export default function MyPosts() {
  const { data: vacanciesData, isLoading: vLoading } = useMyVacancies();
  const { data: internshipsData, isLoading: iLoading } = useMyInternships();
  const { data: oneTimeTasksData, isLoading: tLoading } = useMyProjects();
  const { data: opportunitiesData, isLoading: oLoading } = useMyOpportunities();

  const t = useT();

  if (vLoading || iLoading || tLoading || oLoading) {
    return <p>Loading...</p>;
  }

  const allPosts: MyPost[] = [
    ...(vacanciesData?.data || []).map(mapVacancy),
    ...(internshipsData?.data || []).map(mapInternship),
    ...(oneTimeTasksData?.data || []).map(mapOneTimeTask),
    ...(opportunitiesData?.data || []).map(mapOpportunities)
  ];

  allPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (allPosts.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        {t("you_dont_have_posts")}
      </p>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-4">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        {t("my_posts")}
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
                <p className="text-md sm:text-xl mt-3 font-bold break-all">
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
