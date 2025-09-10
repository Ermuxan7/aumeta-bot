"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  InternshipFormValue,
  InternshipSchema,
} from "@/app/schema/InternFormSchema";
import BackButton from "@/components/ui/back-button";
import { useCreateInternship } from "@/hooks/useInternship";
import { InternshipType } from "@/types/internshipType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Internship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InternshipFormValue>({
    resolver: zodResolver(InternshipSchema),
  });

  const createInternshipMutation = useCreateInternship();

  const onSubmit = (data: InternshipFormValue) => {
    const payload = {
      country_id: 4,
      region_id: 6,
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

    createInternshipMutation.mutate(payload);
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
        {errors.lawazim && (
          <p className="text-red-500">{errors.lawazim.message}</p>
        )}
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
        {errors.talaplar && (
          <p className="text-red-500">{errors.talaplar.message}</p>
        )}
        <FormInput
          legend="Májburiyatlar"
          as="textarea"
          placeholder="Klientlermen islew, esabatlar, satıw kerek h.t.b"
          registration={register("májburiyatlar")}
        />
        {errors.májburiyatlar && (
          <p className="text-red-500">{errors.májburiyatlar.message}</p>
        )}
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
        {errors.manzil && (
          <p className="text-red-500">{errors.manzil.message}</p>
        )}
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
        {errors.baylanis && (
          <p className="text-red-500">{errors.baylanis.message}</p>
        )}
        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Bonuslar, shárayatlar h.t.b qolaylıqlar"
          registration={register("qosimsha")}
        />
        {createInternshipMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        {createInternshipMutation.isError && (
          <p className="text-red-500">Qatelik ju'z berdi ❌</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {createInternshipMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default Internship;
