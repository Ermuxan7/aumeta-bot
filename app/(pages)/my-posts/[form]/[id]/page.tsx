"use client";
import InternshipEditForm from "@/app/components/my-posts/forms/InternshipForm";
import OpportunitiesEditForm from "@/app/components/my-posts/forms/OpportunitiesForm";
import ProjectEditForm from "@/app/components/my-posts/forms/ProjectForm";
import VacancyEditForm from "@/app/components/my-posts/forms/VacancyForm";
import { useMyInternships } from "@/hooks/useInternship";
import { useMyOpportunities } from "@/hooks/useOpportunities";
import { useMyProjects } from "@/hooks/useProject";
import { useT } from "@/hooks/useT";
import { useMyVacancies } from "@/hooks/useVacancy";
import { useParams } from "next/navigation";

export default function MyPostDetail() {
  const { id, form } = useParams<{ id: string; form: string }>();
  const { data: vacancies } = useMyVacancies();
  const { data: internships } = useMyInternships();
  const { data: projects } = useMyProjects();
  const { data: opportunities } = useMyOpportunities();

  const t = useT();

  let post: any;
  if (form === "vacancy") {
    post = vacancies?.data.find((v: any) => String(v.id) === id);
  } else if (form === "internship") {
    post = internships?.data.find((i: any) => String(i.id) === id);
  } else if (form === "project") {
    post = projects?.data.find((p: any) => String(p.id) === id);
  } else if (form === "opportunities") {
    post = opportunities?.data.find((o: any) => String(o.id) === id);
  }
  if (!post) return <p className="text-lg text-foreground">{t("not_found")}</p>;

  switch (form) {
    case "vacancy":
      return <VacancyEditForm data={post} />;
    case "internship":
      return <InternshipEditForm data={post} />;
    case "project":
      return <ProjectEditForm data={post} />;
    case "opportunities":
      return <OpportunitiesEditForm data={post} />;
  }

  return <p>{t("no_such_form")}</p>;
}
