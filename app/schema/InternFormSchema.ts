import z from "zod";

export const InternshipSchema = z.object({
  region_id: z.string().min(1, "Region tanlaniwi sha'rt!"),
  lawazim: z.string().min(2, "Lawazım kiritiliwi sha'rt!"),
  mekeme: z.string().optional(),
  talaplar: z.string().min(2, "Talaplar kiritiliwi sha'rt!"),
  májburiyatlar: z.string().min(2, "Májburiyatlar kiritiliwi sha'rt!"),
  sharayatlar: z.string().optional(),
  manzil: z.string().min(2, "Ma'nzil kiritiliwi sha'rt!"),
  tolem: z.string().optional(),
  baylanis: z.string().min(5, "Baylanıs túrin kiritiw shárt!"),
  qosimsha: z.string().optional(),
});

export type InternshipFormValue = z.infer<typeof InternshipSchema>;
