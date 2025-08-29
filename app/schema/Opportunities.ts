import z from "zod";

export const OpportunitiesSchema = z.object({
  daǵaza: z.string().min(2, "Daǵaza tekstin jazıw shárt!"),
  baylanis: z.string().min(2, "Baylanıs túrin kiritiw shárt!"),
});

export type OpportunitiesFormValue = z.infer<typeof OpportunitiesSchema>;
