import { MyPost } from "@/types/myPostType";

export function mapVacancy(item: any): MyPost {
  const { day, month, year } = item.created_at;
  return {
    id: item.id,
    aymaq: item.location.region,
    lawazim: item.position_title,
    mekeme: item.organization_name,
    createdAt: `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`,
    form: "Vacancy",
  };
}

export function mapInternship(item: any): MyPost {
  const { day, month, year } = item.created_at;
  return {
    id: item.id,
    aymaq: item.location.region,
    lawazim: item.position_title,
    mekeme: item.organization_name,
    createdAt: `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`,
    form: "Internship",
  };
}

export function mapOpportunities(item: any): MyPost {
  const { day, month, year } = item.created_at;
  return {
    id: item.id,
    aymaq: item.location.region,
    lawazim: item.content,
    mekeme: item.contact,
    createdAt: `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`,
    form: "Opportunities",
    img: item.img || null,
  };
}

export function mapOneTimeTask(item: any): MyPost {
  const { day, month, year } = item.created_at;
  return {
    id: item.id,
    aymaq: item.location.region,
    lawazim: item.who_needed,
    mekeme: "",
    createdAt: `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`,
    form: "Project",
  };
}
