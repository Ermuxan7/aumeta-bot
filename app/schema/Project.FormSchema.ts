import z from "zod";

export const ProjectSchema = z.object({
  aymaq: z.string().min(2, "Aymaq kiritiliwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  talaplar: z.string().min(2, "Talaplar beriliwi kerek"),
  tólem: z.string().min(2, "Is haqin jaziw kerek"),
  deadline: z.string().optional(),
  baylanis: z.string().min(5, "Baylanıs toliq boliwi kerek"),
  manzil: z.string().optional(),
  qosimsha: z.string().optional(),
});

export type ProjectFormValue = z.infer<typeof ProjectSchema>;
