import z from "zod";

export const createProjectSchema = (t: any) =>
  z.object({
    region_id: z
      .string()
      .min(1, t("region_required"))
      .refine((val) => val !== "0" && val !== "", {
        message: t("region_required")
      }),
    lawazim: z.string().min(2, t("role_name_required")),
    talaplar: z.string().min(2, t("requirements_required")),
    tólem: z.string().min(2, t("payment_required")),
    deadline: z.string().optional(),
    baylanis: z.string().min(5, t("contact_required")),
    manzil: z.string().optional(),
    qosimsha: z.string().optional()
  });

export type ProjectFormValue = z.infer<ReturnType<typeof createProjectSchema>>;
