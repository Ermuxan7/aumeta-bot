import z from "zod";

export const ProjectSchema = z.object({
  region_id: z.string().min(1, "Region tanlaniwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  talaplar: z.string().min(2, "Talaplar kiritiliwi shárt!"),
  tólem: z.string().min(2, "Is haqin jaziw shárt!"),
  deadline: z.string().optional(),
  baylanis: z.string().min(5, "Baylanıs túrin kiritiw shárt!"),
  manzil: z.string().optional(),
  qosimsha: z.string().optional(),
});

export type ProjectFormValue = z.infer<typeof ProjectSchema>;
