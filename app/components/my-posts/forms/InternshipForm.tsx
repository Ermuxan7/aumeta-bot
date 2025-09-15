"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  InternshipFormValue,
  InternshipSchema,
} from "@/app/schema/InternFormSchema";
import BackButton from "@/components/ui/back-button";
import { useCreateInternship, useIdInternship } from "@/hooks/useInternship";
import { useLocationStore } from "@/store/locationStore";
// import { InternshipType } from "@/types/internshipType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type InternshipType = {
  data: any;
};

const InternshipEditForm = ({ data }: InternshipType) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InternshipFormValue>({
    defaultValues: {
      aymaq: "",
      lawazim: "",
      mekeme: "",
      talaplar: "",
      májburiyatlar: "",
      sharayatlar: "",
      manzil: "",
      tolem: "",
      baylanis: "",
      qosimsha: "",
    },
    resolver: zodResolver(InternshipSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        aymaq: data.location?.region ?? "",
        lawazim: data.position_title ?? "",
        mekeme: data.organization_name ?? "",
        manzil: data.address ?? "",
        talaplar: data.requirements ?? "",
        májburiyatlar: data.duties ?? "",
        sharayatlar: data.conditions ?? "",
        tolem: data.salary ?? "",
        baylanis: data.contact ?? "",
        qosimsha: data.additional_info ?? "",
      });
    }
  }, [data, reset]);

  const updateInternshipMutation = useIdInternship(data.id);
    const { countryId, regionId } = useLocationStore();
  

  const onSubmit = (data: InternshipFormValue) => {
    const payload = {
      country_id: countryId,
      region_id: regionId,
      position_title: data.lawazim,
      organization_name: data.mekeme,
      address: data.manzil,
      requirements: data.talaplar,
      conditions: data.sharayatlar,
      duties: data.májburiyatlar,
      salary: data.tolem,
      contact: data.baylanis,
      additional_info: data.qosimsha,
    };

    updateInternshipMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">Ámeliyat</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Aymaq"
          type="text"
          placeholder="Qaraqalpaqstan, Tashkent, Samarqand, Nawayı, Xarezm h.t.b"
          registration={register("aymaq")}
        />
        {errors.aymaq && <p className="text-red-500">{errors.aymaq.message}</p>}
        <FormInput
          legend="Lawazim ati"
          type="text"
          placeholder="Dizayner, menejer, esapshı h.t.b"
          registration={register("lawazim")}
        />
        <FormInput
          legend="Mekeme"
          type="text"
          placeholder="Bizler Group, ООО Ромашка, Delivery Express h.t.b"
          registration={register("mekeme")}
        />
        <FormInput
          legend="Talaplar"
          as="textarea"
          placeholder="Tájiriybe 2 jıl, Excel biliw, Inglis tili B2"
          registration={register("talaplar")}
        />

        <FormInput
          legend="Májburiyatlar"
          as="textarea"
          placeholder="Klientlermen islew, esabatlar, satıw kerek h.t.b"
          registration={register("májburiyatlar")}
        />

        <FormInput
          legend="Sharayatlar"
          as="textarea"
          placeholder="Ofis, kompyuter, internet, obet ozimizden) h.t.b"
          registration={register("sharayatlar")}
        />
        <FormInput
          legend="Mánzil hám format"
          type="text"
          placeholder="Москва, Tashkent, Ақтау, Бишкек ул. h.t.b"
          registration={register("manzil")}
        />

        <FormInput
          legend="To'lem"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("tolem")}
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
          registration={register("baylanis")}
        />

        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Bonuslar, shárayatlar h.t.b qolaylıqlar"
          registration={register("qosimsha")}
        />
        {updateInternshipMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        {updateInternshipMutation.isError && (
          <div className="text-red-500">
            <p>Qatelik: {String(updateInternshipMutation.error)}</p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateInternshipMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateInternshipMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateInternshipMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default InternshipEditForm;
