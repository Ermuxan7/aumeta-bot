import z from "zod";

export const InternshipSchema = z.object({
  aymaq: z.string().min(2, "Aymaq kiritiliwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  mekeme: z.string().optional(),
  talaplar: z.string().min(2, "Talaplar beriliwi kerek"),
  májburiyatlar: z.string().min(2, "Májburiyatlar beriliwi kerek"),
  sharayatlar: z.string().optional(),
  manzil: z.string().min(2, "Ma'nzil kiritiliwi sha'rt!"),
  tolem: z.string().optional(),
  baylanis: z.string().min(5, "Baylanıs toliq boliwi kerek"),
  qosimsha: z.string().optional(),
});

export type InternshipFormValue = z.infer<typeof InternshipSchema>;
