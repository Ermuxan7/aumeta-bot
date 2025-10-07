import z from "zod";

export const createOpportunitiesSchema = (t: any) =>
  z.object({
    region_id: z
      .string()
      .min(1, t("region_required"))
      .refine((val) => val !== "0" && val !== "", {
        message: t("region_required")
      }),
    daǵaza: z.string().min(2, t("ad_text_required")),
    baylanis: z.string().min(2, t("contact_required"))
  });

export type OpportunitiesFormValue = z.infer<
  ReturnType<typeof createOpportunitiesSchema>
>;
