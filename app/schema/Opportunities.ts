import z from "zod";

export const OpportunitiesSchema = z.object({
  daǵaza: z.string().min(2, "Daǵaza beriliwi sha'rt!"),
  baylanis: z.string().min(2, "Baylanis kiritiliwi sha'rt!"),
});

export type OpportunitiesFormValue = z.infer<typeof OpportunitiesSchema>;
