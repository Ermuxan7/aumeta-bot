import z from "zod";

export const VacancySchema = z.object({
  aymaq: z.string().min(2, "Aymaq kiritiliwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  mekeme: z.string().optional(),
  manzil: z.string().min(2, "Ma'nzil kiritiliwi sha'rt!"),
  talaplar: z.string().min(2, "Talaplar beriliwi kerek"),
  májburiyatlar: z.string().optional(),
  jumisWaqiti: z.string().min(2, "Jumis waqiti beriliw kerek"),
  ayliq: z.string().min(2, "Ayliq beriliw kerek"),
  baylanis: z.string().min(5, "Baylanıs toliq boliwi kerek"),
  qosimsha: z.string().optional(),
});

export type VacancyFormValue = z.infer<typeof VacancySchema>;
