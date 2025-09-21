import z from "zod";

export const OpportunitiesSchema = z.object({
  region_id: z.string().min(1, "Region tanlaniwi sha'rt!"),
  daǵaza: z.string().min(2, "Daǵaza tekstin jazıw shárt!"),
  baylanis: z.string().min(2, "Baylanıs túrin kiritiw shárt!"),
});

export type OpportunitiesFormValue = z.infer<typeof OpportunitiesSchema>;
