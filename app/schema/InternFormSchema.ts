import z from "zod";

export const createInternshipSchema = (t: any) =>
  z.object({
    region_id: z
      .string()
      .min(1, t("region_required"))
      .refine((val) => val !== "0" && val !== "", {
        message: t("region_required")
      }),
    lawazim: z.string().min(2, t("role_name_required")),
    mekeme: z.string().optional(),
    talaplar: z.string().min(2, t("requirements_required")),
    májburiyatlar: z.string().min(2, t("responsibilities_required")),
    sharayatlar: z.string().optional(),
    manzil: z.string().min(2, t("address_required")),
    tolem: z.string().optional(),
    baylanis: z.string().min(5, t("contact_required")),
    qosimsha: z.string().optional()
  });

export type InternshipFormValue = z.infer<
  ReturnType<typeof createInternshipSchema>
>;
