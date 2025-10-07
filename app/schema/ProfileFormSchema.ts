import { z } from "zod";

export const createProfileSchema = (t: any) =>
  z.object({
    full_name: z.string().optional(),
    contact: z.string().min(1, t("contact_required")),
    company_name: z.string().optional(),
    country_id: z.union([
      z.number().min(1, t("country_required")),
      z.string().min(1, t("country_required"))
    ]),
    region_id: z
      .string()
      .min(1, t("region_required"))
      .refine((val) => val !== "0" && val !== "", {
        message: t("region_required")
      }),
    language_code: z.string().optional()
  });

export type ProfileFormValue = z.infer<ReturnType<typeof createProfileSchema>>;
