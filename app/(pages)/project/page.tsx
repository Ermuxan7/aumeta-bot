"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  VacancyFormValue,
  VacancySchema,
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Project = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacancyFormValue>({
    resolver: zodResolver(VacancySchema),
  });

  const onSubmit = (data: VacancyFormValue) => {
    console.log("Data: ", data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-2xl md:text-3xl mb-4">Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Aymaq"
          type="text"
          placeholder="Qaraqalpaqstan, Tashkent, Samarqand, Nawayı, Xarezm h.t.b"
          registration={register("aymaq")}
        />
        {errors.aymaq && <p className="text-red-500">{errors.aymaq.message}</p>}
        <FormInput
          legend="Lawazım"
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
        />
        <FormInput
          legend="Mánzil"
          type="text"
          placeholder="Москва, Tashkent, Ақтау, Бишкек ул. h.t.b"
          registration={register("manzil")}
        />
        {errors.manzil && (
          <p className="text-red-500">{errors.manzil.message}</p>
        )}
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
          legend="Jumıs waqıtı "
          type="text"
          placeholder="9:00 - 18:00, erkin grafik, 5/2"
          registration={register("jumisWaqiti")}
        />
        {errors.jumisWaqiti && (
          <p className="text-red-500">{errors.jumisWaqiti.message}</p>
        )}
        <FormInput
          legend="Aylıq"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("ayliq")}
        />
        {errors.ayliq && <p className="text-red-500">{errors.ayliq.message}</p>}
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
        />
        <button
          type="submit"
          className="px-4 py-2 fles justify-end w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Jiberiw
        </button>
      </form>
    </div>
  );
};

export default Project;
