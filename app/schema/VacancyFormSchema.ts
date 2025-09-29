import z from "zod";

export const createVacancySchema = (t: any) =>
  z.object({
    region_id: z.string().min(1, t("region_required")),
    lawazim: z.string().min(2, t("role_name_required")),
    mekeme: z.string().optional(),
    manzil: z.string().min(2, t("address_required")),
    talaplar: z.string().min(2, t("requirements_required")),
    májburiyatlar: z.string().optional(),
    jumisWaqiti: z.string().min(2, t("work_schedule_required")),
    ayliq: z.string().min(2, t("monthly_salary_required")),
    baylanis: z.string().min(5, t("contact_required")),
    qosimsha: z.string().optional()
  });

export type VacancyFormValue = z.infer<ReturnType<typeof createVacancySchema>>;
