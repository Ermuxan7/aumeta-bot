import z from "zod";

export const VacancySchema = z.object({
  aymaq: z.string().min(2, "Aymaq kiritiliwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  mekeme: z.string().optional(),
  manzil: z.string().min(2, "Ma'nzil kiritiliwi sha'rt!"),
  talaplar: z.string().min(2, "Talaplar kiritiliwi sha'rt!"),
  májburiyatlar: z.string().optional(),
  jumisWaqiti: z.string().min(2, "Jumis waqiti beriliw sha'rt!"),
  ayliq: z.string().min(2, "Ayliq kiritiliwi sha'rt!"),
  baylanis: z.string().min(5, "Baylanıs túrin kiritiw shárt!"),
  qosimsha: z.string().optional(),
});

export type VacancyFormValue = z.infer<typeof VacancySchema>;
