export type MyPost = {
  id: number;
  aymaq: {
    id: number;
    name: string;
  };
  lawazim: string;
  mekeme: string;
  createdAt: string;
  img?: string | null;
  form: "Vacancy" | "Internship" | "Opportunities" | "Project";
};
