import { z } from "zod";

export const createProfileSchema = (t: any) =>
  z.object({
    full_name: z.string().optional(),
    contact: z.string().min(1, t("contact_required")),
    company_name: z.string().optional(),
    country_id: z.number().min(1, t("country_required")),
    region_id: z.string().optional(),
    language_code: z.string().optional()
  });

export type ProfileFormValue = z.infer<ReturnType<typeof createProfileSchema>>;
