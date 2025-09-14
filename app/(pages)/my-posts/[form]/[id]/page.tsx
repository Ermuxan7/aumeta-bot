"use client";
import InternshipEditForm from "@/app/components/my-posts/forms/InternshipForm";
import VacancyEditForm from "@/app/components/my-posts/forms/VacancyForm";
import { useMyInternships } from "@/hooks/useInternship";
import { useMyProjects } from "@/hooks/useProject";
import { useMyVacancies } from "@/hooks/useVacancy";
import { useParams } from "next/navigation";

export default function MyPostDetail() {
  const { id, form } = useParams<{ id: string; form: string }>();
  const { data: vacancies } = useMyVacancies();
  const { data: internships } = useMyInternships();
  const { data: projects } = useMyProjects();

  let post: any;
  if (form === "vacancy") {
    post = vacancies?.data.find((v: any) => String(v.id) === id);
  } else if (form === "internship") {
    post = internships?.data.find((i: any) => String(i.id) === id);
  } else if (form === "project") {
    post = projects?.data.find((p: any) => String(p.id) === id);
  }

  if (!post) return <p className="text-lg text-foreground">Not Found!</p>;

  switch (form) {
    case "vacancy":
      return <VacancyEditForm data={post} />;
    case "internship":
      return <InternshipEditForm data={post} />;
  }

  return <p>Bunday turdegi form ele tayyar emes</p>;
}
